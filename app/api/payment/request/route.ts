import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (req.method !== "POST") {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 500 })
    }
    const { code } = await req.json()

    if (!code) {
        return NextResponse.json({ message: 'No code' }, { status: 400 })
    }

    const pack = await prisma.package.findFirst({
        where: {
            code
        }
    })

    if (!pack) {
        return NextResponse.json({ message: 'Package not found' }, { status: 404 })
    }
    const order_id = uuidv4()
    const body = {
        "transaction_details": {
            "order_id": order_id,
            "gross_amount": pack.price
        },
        "customer_details": {

        }
    }

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    if (!user?.email) {
        return NextResponse.json({ message: 'User not found' })
    }

    const response = await fetch(process.env.SERVER_MIDTRANS_URL || '',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${process.env.SERVER_KEY_MIDTRANS_HASHED}`
            },
            body: JSON.stringify(body)
        })

    await prisma.transaction.create({
        data: {
            id: order_id,
            package: {
                connect: {
                    id: pack.id
                }
            },
            amount: pack.price,
            status: 'pending',
            payment_type: 'midtrans',
            gross_amount: pack.price,
            user: {
                connect: {
                    email: user?.email
                }
            }
        }
    })


    const resJson = await response.json()

    return NextResponse.json({ ...resJson, order_id })
}