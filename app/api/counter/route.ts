import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    
    const searchParams = new URL(req.url).searchParams;
    const total = Number(searchParams.get('total')) || 0;
  
    const session = await getServerSession(authOptions)
  
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

  
    const { id } = await prisma.questionGenerated.create({
        data: {
            total,
            user: {
                connect:{
                    email: session.user.email
                }
            },
        },
    });

    return NextResponse.json({ id });
  }