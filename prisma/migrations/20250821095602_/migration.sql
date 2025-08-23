/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Pomodoro` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `SessionUser` table. All the data in the column will be lost.
  - Added the required column `pomodoroSessionId` to the `Pomodoro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Pomodoro" DROP CONSTRAINT "Pomodoro_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SessionUser" DROP CONSTRAINT "SessionUser_sessionId_fkey";

-- AlterTable
ALTER TABLE "public"."Pomodoro" DROP COLUMN "sessionId",
ADD COLUMN     "pomodoroSessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."SessionUser" DROP COLUMN "sessionId";

-- AddForeignKey
ALTER TABLE "public"."Pomodoro" ADD CONSTRAINT "Pomodoro_pomodoroSessionId_fkey" FOREIGN KEY ("pomodoroSessionId") REFERENCES "public"."PomodoroSesssion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
