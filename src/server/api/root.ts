import { questionsRouter } from "@/server/api/routers/questions";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  questions: questionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
