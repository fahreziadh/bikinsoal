/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from "openai";
import { env } from "@/env.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  // Rate Limit

  if (env.KV_REST_API_URL && env.KV_REST_API_TOKEN) {
    const ip = req.headers.get("x-forwarded-for");
    const ratelimit = new Ratelimit({
      redis: kv,
      // rate limit to 5 requests per 24 hours
      limiter: Ratelimit.slidingWindow(5, "24h"),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`,
    );

    if (!success) {
      return new Response("(e)Kamu Sudah mencapai batas request harian yaitu 5 kali, Coba Lagi Besok ya 🤪");
    }
  }

  const { prompt } = await req.json();
  const params = new URL(req.url).searchParams;
  const withOption = params.get("withOption") === "true" ? true : false;

  const classificationResponse = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    stream: false,
    temperature: 0.2,
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
  if (total > 15) {
    return new Response("(e)Jumlah soal maksimal 15");
  }

  let generateQuizPrompt = "";

  if (withOption) {
    generateQuizPrompt = `Berikan soal pilihan ganda tanpa pilihan, hanya soal saja. berjumlah ${total} untuk ${grade} dengan mata pelajaran ${subject} dan topik ${topic}. pastikan hanya berikan soal dengan format berikut: (q)question(s)(q)question(s)(q)question(s). jangan ada urutan nomor pada awal soal. tanda (q) untuk question, dan (s) untuk stop.`;
  } else {
    generateQuizPrompt = `Berikan soal berjumlah ${total} untuk ${grade} dengan mata pelajaran ${subject} dan topik ${topic}. pastikan hanya berikan soal dengan format berikut: (q)question(s)(q)question(s)(q)question(s). jangan ada urutan nomor pada awal soal. tanda (q) untuk question, dan (s) untuk stop.`;
  }

  const generateQuiz = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    stream: true,
    temperature: 0.7,
    max_tokens: 1000,
    prompt: generateQuizPrompt,
  });

  const stream = OpenAIStream(generateQuiz);

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
