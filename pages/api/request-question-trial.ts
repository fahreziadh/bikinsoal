import { OpenAIStream, OpenAIStreamPayload } from "utils/OpenAiStream";


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


  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `saya ingin membuat ${total} pertanyaan pelajaran ${subject} untuk murid kelas ${grade} dengan ${total_option} pilihan jawaban. buatkan dalam bentuk custom format berupa (q)question.(to)total options(o)options 1(o)options 2(o)option ..(a)answear. Tidak perlu ada prefix di pilihan jawaban.` }
    ],
    temperature: 0.7,
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