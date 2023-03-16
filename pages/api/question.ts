import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { OpenAIStream, OpenAIStreamPayload } from "utils/OpenAiStream";
import { authOptions } from "./auth/[...nextauth]";


if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not defined")
}

export const config = {
    runtime: 'edge',
}

const handler = async (req: Request) => {
    if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    const { subject, grade, have_options = false, topic, total = 5 } = (await req.json()) as {
        subject: string;
        grade: string;
        have_options: boolean;
        topic: string;
        total: number;
    };


    const main = `berikan ${total} soal ujian`
    const _grade = `untuk ${grade.toLocaleLowerCase() === 'umum' ? 'umum' : `${grade}`}`
    const _topic = topic ? `dengan topik berkaitan dengan: ${topic}` : ''
    const option = `berupa ${have_options ? `pertanyaan dan opsi jawaban` : 'pertanyaan essay dan jawabannya'}`
    const format = `gunakan format json berikut: ${have_options ? '[{question: "pertanyaan", options: ["opsi1", "opsi2", "opsi3", "opsi4"], answer: "jawaban sesuai opsi"}]' : '[{question: "pertanyaan", answer: "jawaban"}]'}`

    const content = `${main} ${subject} ${_grade} ${_topic} ${option} ${format}`

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content }
            ],
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 4000,
            stream: false,
            n: 1,
        }),
    });

    const json = await res.json();


    return NextResponse.json({ json })
}

export default handler;