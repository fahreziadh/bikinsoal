import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return {
            status: 401,
            body: {
                message: "Unauthorized"
            }
        }
    }

    const { question, a, b, c, d, e, answer } = await req.json()
    
    const qb = await prisma.questionBank.create({
        data: {
            question,
            a,
            b,
            c,
            d,
            e,
            answer,
            user: {
                connect: {
                    email: session?.user?.email
                }
            }
        }
    })

    return NextResponse.json(qb)
}