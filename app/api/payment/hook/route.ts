import crypto from "crypto";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    if (req.method !== "POST") {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 500 })
    }

    const { signature_key, order_id, payment_type, gross_amount, status_code, transaction_status } = await req.json()

    const verifySignature = crypto.createHash('sha512').update(`${order_id}${status_code}${gross_amount}${process.env.SERVER_KEY_MIDTRANS}`).digest('hex')

    if (verifySignature !== signature_key) {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 500 })
    }

    if (!order_id) {
        return NextResponse.json({ message: 'Invalid order id' }, { status: 500 })
    }

    const getTrx = await prisma.transaction.findFirst({
        where:{
            id: order_id
        },
        select:{
            package:true
        }
    })

    const expired_at =  getTrx?.package.code === "monthly" ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : new Date(new Date().setDate(new Date().getDate() + 7))

    const trx = await prisma.transaction.update({
        where: {
            id: order_id
        },
        data: {
            status: transaction_status,
            amount: Number(gross_amount),
            gross_amount: Number(gross_amount),
            updatedAt: new Date(),
            payment_type: payment_type,
            expired_at: transaction_status === 'capture' || transaction_status === 'settlement' ? expired_at : null,
            is_active: transaction_status === 'capture' || transaction_status === 'settlement' ? true : false
        },
    })

    if (!trx) {
        return NextResponse.json({ message: 'Transaction not found' })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: trx.user_id
        }
    })

    if (transaction_status === 'capture' || transaction_status === 'settlement') {
        await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`
            },
            body: JSON.stringify({
                personalizations: [
                    {
                        to: [{ email: user?.email }],
                        dynamic_template_data: {
                            customer_name: user?.name,
                            package_name: Number(trx.amount) === 12000 ? "Mingguan" : "Bulanan",
                            package_price: trx.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
                            transaction_url: "https://bikinsoal.com/generate"
                        }
                    }
                ],
                template_id: "d-56213ca8490c4d8390622a00266893f6",
                subject: "Payment Success - Bikinsoal.com",
                from: {
                    email: "fahrezi@bikinsoal.com",
                    name: "Bikinsoal.com"
                },
            })
        }).then(() => {
            console.log("Email sent");
        }).catch((e) => {
            console.log(e);
        })

    }

    return NextResponse.json({})
}
