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

    const { question, a, b, c, d, e, answer, subject } = await req.json()

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
            },
            subject: subject
        }
    })

    return NextResponse.json(qb)
}

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return {
            status: 401,
            body: {
                message: "Unauthorized"
            }
        }
    }

    const url = new URL(req.url)
    const query = url.searchParams.get("query") || ''
    const paramsPage = parseInt(url.searchParams.get("page") || '1')
    const paramsLimit = parseInt(url.searchParams.get("limit") || '10')

    const qb = await prisma.questionBank.findMany({
        where: {
            user: {
                email: session?.user?.email
            },
            question: {
                contains: query
            }
        },
        skip: (paramsPage - 1) * paramsLimit,
        take: paramsLimit,
    })

    const total = await prisma.questionBank.count({
        where: {
            user: {
                email: session?.user?.email
            },
            question: {
                contains: query
            }
        }
    })

    return NextResponse.json(
        {
            questions: qb,
            pagination: {
                total,
                totalPage: Math.ceil(total / paramsLimit),
                currentPage: paramsPage,
            }
        }
    )
}

export const DELETE = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return {
            status: 401,
            body: {
                message: "Unauthorized"
            }
        }
    }

    const { ids } = await req.json()

    const qb = await prisma.questionBank.deleteMany({
        where: {
            user: {
                email: session?.user?.email
            },
            id: {
                in: ids
            }
        }
    })

    return NextResponse.json(qb)
}