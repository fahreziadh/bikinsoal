import { prisma } from "@/lib/db"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const total = await prisma.questionGenerated.aggregate({
        where: {
            user: {
                email: session?.user?.email
            },
            createdAt: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
                lte: new Date(new Date().setHours(23, 59, 59, 999)),
            },
        },
        _sum: {
            total: true,
        },
    })

    const limit_max = 15


    return NextResponse.json({
        limit_left: limit_max - (total._sum.total || 0),
        limit_max,
        is_limit_reached: (total._sum.total || 0) >= limit_max,
    })
}