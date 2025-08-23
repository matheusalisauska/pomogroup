import { pomodoroSessionsRouter } from "./routers/pomodoro-sessions";
import { pomodoroRouter } from "./routers/pomodoroRouter";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  users: userRouter,
  pomodoro: pomodoroRouter,
  pomodoroSessions: pomodoroSessionsRouter
})

export type AppRouter = typeof appRouter;