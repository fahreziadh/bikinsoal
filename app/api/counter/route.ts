import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)
  
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const searchParams = new URL(req.url).searchParams;
    const total = Number(searchParams.get('total')) || 0;
  
  
    const { id } = await client.questionGenerated.create({
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