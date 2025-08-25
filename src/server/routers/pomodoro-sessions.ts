import { prisma } from "@/lib/prisma";
import { authProcedure, router } from "../trpc";
import z from "zod";
import { revalidatePath } from "next/cache";


export const pomodoroSessionsRouter = router({
    getAll: authProcedure
    .query(async () => {
      const sessions = await prisma.pomodoroSession.findMany();
     
      return sessions;
    }),
    leaveSession: authProcedure
    .mutation(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { currentSessionId: true },
      });

      if (!user || !user.currentSessionId) {
        throw new Error("Você não está em uma sessão");
      }

      await prisma.user.update({
        where: { id: userId },
        data: { currentSessionId: null },
      });

     
      return { success: true };
    }),
    enterSession: authProcedure.input(z.object({id: z.string()}))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { currentSessionId: true },
      });

      if (user && user.currentSessionId) {
        throw new Error("Você já está em uma sessão");
      }

      await prisma.user.update({
        where: { id: userId },
        data: { currentSessionId: input.id },
      });

      revalidatePath('/lobby');
      return { success: true };
    })
})
