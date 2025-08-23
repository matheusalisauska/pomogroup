import { prisma } from "@/lib/prisma";
import z from "zod";
import { authProcedure, router } from "../trpc";


export const pomodoroRouter = router({
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
})
