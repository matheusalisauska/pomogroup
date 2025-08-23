/*
  Warnings:

  - You are about to drop the `PomodoroSesssion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Pomodoro" DROP CONSTRAINT "Pomodoro_pomodoroSessionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pomodoro" DROP CONSTRAINT "Pomodoro_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PomodoroSesssion" DROP CONSTRAINT "PomodoroSesssion_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SessionUser" DROP CONSTRAINT "SessionUser_pomodoroSesssionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SessionUser" DROP CONSTRAINT "SessionUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."session" DROP CONSTRAINT "session_userId_fkey";

-- DropTable
DROP TABLE "public"."PomodoroSesssion";

-- DropTable
DROP TABLE "public"."SessionUser";

-- DropTable
DROP TABLE "public"."user";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentSessionId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PomodoroSession" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PomodoroSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_currentSessionId_fkey" FOREIGN KEY ("currentSessionId") REFERENCES "public"."PomodoroSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PomodoroSession" ADD CONSTRAINT "PomodoroSession_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pomodoro" ADD CONSTRAINT "Pomodoro_pomodoroSessionId_fkey" FOREIGN KEY ("pomodoroSessionId") REFERENCES "public"."PomodoroSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pomodoro" ADD CONSTRAINT "Pomodoro_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
