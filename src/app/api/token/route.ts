import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerAuthSession();

    const user = await db.query.users.findFirst({
        where: eq(users.id, session?.user.id ?? "")
    })

    return NextResponse.json({ token: user?.token ?? 0 })
}