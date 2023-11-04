/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from "openai";
import { env } from "@/env.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { db } from "@/server/db";
import { questions, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const params = new URL(req.url).searchParams;
  const userId = params.get("userId") ?? "";
  const withOption = params.get("withOption") === "true" ? true : false;

  let customPrompt = "";

  if (withOption) {
    customPrompt = `Berikan 4 opsi jawaban pilihan ganda dan 1 jawaban yang benar untuk pertanyaan '${prompt}', dengan format (a)jawaban a, (b)jawaban b, (c)jawaban c, (d) jawaban d, dan (correct) pilihan jawaban a,b,c atau d tanpa text. berikan opsi jawaban se efektif dan sesingkat mungkin.`;
  } else {
    customPrompt = `Berikan 1 jawaban untuk pertanyaan '${prompt}', dengan format (correct)jawaban, karena (correct) adalah jawaban, tidak perlu menambahkan text lain selain (correct) jawaban, berikan jawaban se efektif dan sesingkat mungkin.`;
  }

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    stream: true,
    temperature: 0.2,
    max_tokens: 100,
    prompt: customPrompt.replace("(stop)", ""),
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      const question = prompt as string;
      const answer = completion.split("(correct)")?.at(1);
      const optionA = completion.split("(a)").at(1)?.split("(").at(0) ?? "";
      const optionB = completion.split("(b)").at(1)?.split("(").at(0) ?? "";
      const optionC = completion.split("(c)").at(1)?.split("(").at(0) ?? "";
      const optionD = completion.split("(d)").at(1)?.split("(").at(0) ?? "";

      const currentQuestion = await db.query.questions.findFirst({
        where: (fields, { eq, and }) =>
          and(eq(fields.userId, userId), eq(fields.question, question)),
      });

      if (currentQuestion) {
        await db
          .update(questions)
          .set({
            optionA,
            optionB,
            optionC,
            optionD,
            answer,
          })
          .where(eq(questions.id, currentQuestion.id));

        return;
      }

      await db.insert(questions).values({
        id: crypto.randomUUID(),
        userId,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer
      });
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
