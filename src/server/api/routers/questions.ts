import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { questions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const questionsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        answer: z.string(),
        options: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.db.query.questions.findFirst({
        where: (fields, operator) =>
          operator.eq(fields.question, input.question),
      });

      if (question) {
        await ctx.db
          .update(questions)
          .set({
            optionA: input.options[0],
            optionB: input.options[1],
            optionC: input.options[2],
            optionD: input.options[3],
            answer: input.answer,
          })
          .where(eq(questions.id, question.id));

        return;
      }

      await ctx.db.insert(questions).values({
        id: crypto.randomUUID(),
        userId: ctx.session.user.id,
        question: input.question,
        createdAt: new Date(),
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.questions.findMany({
      where: (fields, operator) =>
        operator.eq(fields.userId, ctx.session.user.id),
      orderBy(fields, operators) {
        return operators.desc(fields.createdAt);
      },
    });
  }),
});
