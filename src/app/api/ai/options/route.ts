/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from "openai";
import { env } from "@/env.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
    const { prompt } = await req.json();
    const customPrompt = `Berikan 4 opsi jawaban pilihan ganda dan 1 jawaban yang benar untuk pertanyaan '${prompt}', dengan format (a)jawaban a, (b)jawaban b, (c)jawaban c, (d) jawaban d, dan (correct) pilihan jawaban a,b,c atau d tanpa text. berikan opsi jawaban se efektif dan sesingkat mungkin.`
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        stream: true,
        temperature: 0.2,
        max_tokens: 100,
        prompt: customPrompt,
    });


    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
}