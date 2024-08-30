import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { bookingAdditionalItems } from "~/server/db/schema";
import { eq } from "drizzle-orm/sql";

export const bookingAdditionalRouter = createTRPCRouter({
  getTypes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.bookingAdditionalTypes.findMany();
  }),
  getType: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.bookingAdditionalTypes.findFirst({
        where: (types, { eq }) => eq(types.name, input.name),
        with: {
          items: true,
        },
      });
    }),
  upsertItemType: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        id: z.number().optional(),
        typeId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      if (!input.id) {
        await ctx.db.insert(bookingAdditionalItems).values({
          name: input.name,
          typeId: input.typeId,
        });
      } else {
        await ctx.db
          .update(bookingAdditionalItems)
          .set({
            name: input.name,
            typeId: input.typeId,
          })
          .where(eq(bookingAdditionalItems.id, input.id ?? 0));
      }
    }),
});
