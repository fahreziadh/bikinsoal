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

  let limit_max = 15
  let have_subscription = false
  let expired_at

  // get user's transaction depend on pack code and validate the date 
  const transaction = await prisma.transaction.findMany({
    where: {
      user: {
        email: session?.user?.email
      },
      is_active: true,
      expired_at: {
        gte: new Date()
      }
    },
    select: {
      package: true,
      updatedAt: true,
      is_active: true,
      expired_at: true
    }
  })


  if (transaction && transaction.length > 0) {
    have_subscription = true
    expired_at = transaction.find((item) => item.is_active)?.expired_at?.toString()
  }

  return NextResponse.json(
    {
      limit_left: limit_max - (total._sum.total || 0),
      limit_max,
      expired_at: expired_at,
      have_subscription: have_subscription,
      is_limit_reached: (total._sum.total || 0) >= limit_max,
    }
  )
}