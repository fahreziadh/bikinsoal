import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, OpenAIStreamPayload } from "utils/OpenAiStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined")
}
export const config = {
  runtime: 'edge',
}

const handler = async (req, res): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const token = await getToken({ req })

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { subject, grade = "umum", have_options = false, topic = "", total = 5 } = (await req.json()) as {
    subject: string;
    grade: string;
    have_options: boolean;
    topic: string;
    total: number;
  };

  const main = `berikan ${total} soal ujian,`
  const _subject = `untuk pelajaran ${subject},`
  const _grade = `untuk ${grade.toLocaleLowerCase() === 'umum' ? 'umum' : `${grade}`}.`
  const _topic = topic ? `dengan topik terkait: ${topic}.` : ''
  const answer = `gunakan json ${have_options ? '[{question:"question",options:[],answer:"answear"}]' : '[{question:"question",answer:"answear"}]'}}.`
  const rules = `jangan tambahkan awalan angka pada setiap soal. ${have_options ? 'tambahkan awalan (a,b,c,d) pada setiap jawaban.' : ''}'}`
  const language = `gunakan referensi kurikulum di Indonesia`

  const content = `${main} ${_subject} ${_grade} ${_topic} ${answer} ${rules} ${language}`
  console.log(content);
  
  /**
   * change model based on subject
   */
  const model = subject.toLocaleLowerCase() === 'matematika' ? 'gpt-4' : 'gpt-3.5-turbo'
  const temperature = subject.toLocaleLowerCase() == 'matematika' ? 0.3 : 0.7

  console.log({ content, model, temperature });

  const payload: OpenAIStreamPayload = {
    model: model,
    messages: [
      { role: "user", content }
    ],
    temperature: temperature,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3500,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}

export default handler;