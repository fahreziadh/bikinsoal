/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from 'openai';
import { env } from '@/env.mjs';
import superjson from 'superjson';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const classificationResponse = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    stream: false,
    temperature: 0.8,
    max_tokens: 300,
    prompt: `klasifikasi text berikut : "${prompt}". hanya berikan jawaban dengan format json {"total":number,"subject":string,"grade":string,"topic":string}, jika tidak ada topik yang berarti beri nilai null. jika tidak ada grade beri nilai 'Umum', jika ada grade pastikan menambahkan angkanya`
  });

  const text = classificationResponse.choices[0]?.text
  let Cgrade = ''
  let Csubject = ''
  let Ctopic = ''
  let Ctotal = 0

  try {
    const { grade, subject, topic, total } = JSON.parse(text ?? "{}")
    Cgrade = grade ?? "Umum"
    Csubject = subject ?? "Umum"
    Ctopic = topic ?? null
    Ctotal = total ?? 0;


  } catch (error) {
    return new Response("Ada kesalahan, silahkan coba lagi")
  }
  return NextResponse.json({
    grade: Cgrade,
    subject: Csubject,
    topic: Ctopic,
    total: Ctotal
  })
}