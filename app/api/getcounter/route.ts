import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const counter = await prisma.questionGenerated.aggregate({
        _sum: {
            total: true
        }
    })

    return NextResponse.json({ counter: counter?._sum.total || 0 });
}