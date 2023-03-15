import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { OpenAIStream, OpenAIStreamPayload } from "utils/OpenAiStream";
import { authOptions } from "./auth/[...nextauth]";


if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined")
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { subject, grade, have_options = false, topic, total = 5 } = (await req.json()) as {
    subject: string;
    grade: string;
    have_options: number;
    topic: string;
    total: number;
  };


  const main = `berikan ${total} soal ujian`
  const _grade = `untuk ${grade.toLocaleLowerCase() === 'umum' ? 'umum' : `${grade}`}`
  const _topic = topic ? `dengan topik berkaitan dengan: ${topic}` : ''
  const option = `berupa ${have_options ? `pertanyaan dan opsi jawaban` : 'pertanyaan essay dan jawabannya'}`
  const answer = `gunakan format xml berikut: <q> pertanyaan </q>${have_options ? "<options> a. opsi1 || b. opsi2 || c. opsi3 || d. opsi4 <options>" : null}<a> jawaban sesuai opsi </a>`
  const rules = `gunakan <break/> sebagai pembatas pada setiap pertanyaan. gunakan || untuk memisahkan opsi jawaban.`

  const content = `${main} ${subject} ${_grade} ${_topic} ${option}. ${answer}. ${rules}`

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content }
    ],
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 4000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}

export default handler;