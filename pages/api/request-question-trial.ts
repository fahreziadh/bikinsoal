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

  const main = `give ${total} test questions,`
  const _grade = `for ${grade.toLocaleLowerCase() === 'umum' ? 'umum' : `${grade}`}.`
  const _topic = topic ? `with topic related to: ${topic}.` : ''
  const answer = `use json ${have_options ? '[{question:"question",options:[],answer:"answear"}]' : '[{question:"question",answer:"answear"}]'}}.`
  const rules = `do not add any prefix like a number or character`
  const language = `use bahasa indonesia for the value, and as much as possible please benchmark it on the curriculum in Indonesia`

  const content = `${main} '${subject}' ${_grade} ${_topic} ${answer} ${rules} ${language}`

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