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

  const { subject, grade, total_option = 4 } = (await req.json()) as {
    subject: string;
    grade: string;
    total_option: number;
  };

  const total = 5;

  const main = `berikan ${total} soal ujian`
  const sub = `untuk ${grade.toLocaleLowerCase() === 'umum' ? 'umum' : `kelas ${grade}`}`
  const option = `berupa ${total_option === 0 ? 'pertanyaan essay dan jawabannya' : `pertanyaan dan ${total_option} opsi jawaban`}`
  const answer = `gunakan format xml berikut: <q> pertanyaan </q>${total_option > 0 ? "<options> a. opsi1 || b. opsi2 || c. opsi3 || d. opsi4 <options>" : null}<a> jawaban sesuai opsi </a>`
  const rules = `gunakan <break/> sebagai pembatas pada setiap pertanyaan. gunakan || untuk memisahkan opsi jawaban.`

  const content = `${main} ${subject} ${sub} ${option}. ${answer}. ${rules}`
  console.log(content);

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content }
    ],
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}

export default handler;