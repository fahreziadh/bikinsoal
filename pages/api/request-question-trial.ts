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
  const sub = `untuk level ${grade.toLocaleLowerCase() === 'umum' ? 'umum' : `${grade}`}`
  const option = `berupa ${total_option === 0 ? 'pertanyaan essay dan jawabannya' : `pertanyaan dan ${total_option} opsi jawaban`}`
  const answer = `jawab dengan format berikut :(q)question${total_option === 0 ? "" : "(to)total option(o)A. option1(o)B. option2(o)C. option...."}(a)answear. ${total_option == 0 ? "" : 'answear = huruf yang menunjukkan jawaban yang benar contoh: (a)B.'}'}`

  const content = `${main} ${subject} ${sub} ${option}. ${answer}`

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content }
    ],
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}

export default handler;