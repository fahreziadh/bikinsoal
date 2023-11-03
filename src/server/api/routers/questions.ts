import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const questionsRouter = createTRPCRouter({
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
