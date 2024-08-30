import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const bookingAdditionalRouter = createTRPCRouter({
  getTypes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.bookingAdditionalTypes.findMany();
  }),
  getType: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.bookingAdditionalTypes.findFirst({
        where: (types, { eq }) => eq(types.name, input.name),
      });
    }),
});
