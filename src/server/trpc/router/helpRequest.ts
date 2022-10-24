import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const helpRequestRouter = router({
  createHelpRequest: publicProcedure.mutation(async ({ ctx }) => {
    const helpRequest = await ctx.prisma.helpRequest.create({
      data: {},
    });
    return helpRequest;
  }),
  deleteHelpRequest: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.helpRequest.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getHelpRequests: publicProcedure.query(async ({ ctx }) => {
    const helpRequests = await ctx.prisma.helpRequest.findMany();
    return helpRequests;
  }),
});
