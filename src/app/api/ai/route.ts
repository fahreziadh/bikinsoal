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
  const params = new URL( req.url).searchParams
  const withOption = params.get("withOption") === 'true' ? true : false
  
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
  if (total > 15){
    return new Response("(e)Jumlah soal maksimal 15");
  }

  let generateQuizPrompt = ''

  if(withOption){
    generateQuizPrompt = `Berikan soal pilihan ganda tanpa pilihan, hanya soal saja. berjumlah ${total} untuk ${grade} dengan mata pelajaran ${subject} dan topik ${topic}. pastikan hanya berikan soal dengan format berikut: (q)question(s)(q)question(s)(q)question(s). jangan ada urutan nomor pada awal soal. tanda (q) untuk question, dan (s) untuk stop.`;
  }else{
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
