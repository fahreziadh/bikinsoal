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

  const total = 3;

  const content = `berikan ${total} soal ujian ${subject} untuk level ${grade.toLocaleLowerCase() === 'umum' ? 'umum' : `${grade}`} berupa ${total_option === 0 ? 'pertanyaan essay dan jawabannya' : `pertanyaan dan ${total_option} opsi jawaban`}. jawab dengan format berikut :(q)question${total_option > 0 && "(to)total option(o)option1(o)option2(o)option...."}(a)jawaban yang benar. tidak perlu manambahkan prefix pada tiap jawaban seperti a,b,c dan d.`

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
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}

export default handler;