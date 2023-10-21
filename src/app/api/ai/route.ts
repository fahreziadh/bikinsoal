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

  const classificationResponse = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    stream: false,
    temperature: 0.8,
    max_tokens: 300,
    prompt: `klasifikasi text berikut : "${prompt}". hanya berikan jawaban dengan format json {"total":number,"subject":string,"grade":string,"topic":string}, jika tidak ada topik yang berarti beri nilai 'Umum'. jika tidak ada grade beri nilai 'Umum', jika ada grade pastikan menambahkan angkanya`,
  });

  const text = classificationResponse.choices[0]?.text;

  const {
    grade = "umum",
    subject = "umum",
    topic = "umum",
    total = 0,
    error = "",
  } = ClassifyInstruction(text ?? "{}");
  
  if (error) {
    return new Response(error, { status: 400 });
  }
  if (total > 5){
    return new Response("Jumlah soal maksimal 5", { status: 400 });
  }
  const generateQuizPrompt = `Berikan soal berjumlah ${total} untuk ${grade} dengan mata pelajaran ${subject} dan topik ${topic}. pastikan hanya berikan soal dengan format berikut: (q)question(q)question(q)question. jangan ada urutan nomor pada awal soal.`;
  console.log(generateQuizPrompt)

  const generateQuiz = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    stream: true,
    temperature: 0.5,
    max_tokens: 1000,
    prompt: generateQuizPrompt,
  });

  const stream = OpenAIStream(generateQuiz);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

function ClassifyInstruction(text: string) {
  let Cgrade = "";
  let Csubject = "";
  let Ctopic = "";
  let Ctotal = 0;

  try {
    const { grade, subject, topic, total } = JSON.parse(text ?? "{}");
    Cgrade = grade;
    Csubject = subject;
    Ctopic = topic;
    Ctotal = total;
  } catch (error) {
    return {
      error: "Gagal memproses instruksi, coba lagi",
    };
  }

  return {
    grade: Cgrade,
    subject: Csubject,
    topic: Ctopic,
    total: Ctotal,
  };
}
