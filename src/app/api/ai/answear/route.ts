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
    const customPrompt = `Berikan 1 jawaban untuk pertanyaan '${prompt}', dengan format (a)jawaban, karena (a) adalah jawaban, tidak perlu menambahkan text lain selain (a) jawaban`
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        stream: true,
        temperature: 0.2,
        max_tokens: 300,
        prompt: customPrompt,
    });


    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
}