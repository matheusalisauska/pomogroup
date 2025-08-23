import { prisma } from "@/lib/prisma";
import { authProcedure, router } from "../trpc";


export const pomodoroSessionsRouter = router({
    getAll: authProcedure
    .query(async () => {
      const sessions = await prisma.pomodoroSession.findMany();
     
      return sessions;
    }),
})
