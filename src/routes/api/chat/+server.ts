import { streamText } from 'ai';
import type { RequestHandler } from './$types';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { env } from '$env/dynamic/private';


const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY
});

export const POST = (async ({ request }) => {
  const { messages } = await request.json();
  const result = streamText({
    model: google('gemini-2.0-pro-exp-02-05'),
    messages,
    system: 'You are a helpful assistant that can answer questions and help with tasks.'
  });

  return result.toDataStreamResponse();
}) satisfies RequestHandler;