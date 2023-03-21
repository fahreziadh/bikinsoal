import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    const counter = await prisma.questionGenerated.aggregate({
        _sum: {
            total: true
        }
    })

    return NextResponse.json({ counter: counter?._sum.total || 0 });
}