-- CreateTable
CREATE TABLE "public"."PomodoroSesssion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "PomodoroSesssion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SessionUser" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pomodoroSesssionId" TEXT,

    CONSTRAINT "SessionUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pomodoro" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'idle',
    "duration" INTEGER NOT NULL,
    "elapsed" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pomodoro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PomodoroSesssion" ADD CONSTRAINT "PomodoroSesssion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SessionUser" ADD CONSTRAINT "SessionUser_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SessionUser" ADD CONSTRAINT "SessionUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SessionUser" ADD CONSTRAINT "SessionUser_pomodoroSesssionId_fkey" FOREIGN KEY ("pomodoroSesssionId") REFERENCES "public"."PomodoroSesssion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pomodoro" ADD CONSTRAINT "Pomodoro_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pomodoro" ADD CONSTRAINT "Pomodoro_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
