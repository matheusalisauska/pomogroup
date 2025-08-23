import { trpc } from "@/server/server"

export async function SessionsList() {
    const sessions = await trpc.pomodoroSessions.getAll();
    console.log('sessions', sessions);
    return (
        <div className="flex flex-col">

        </div>
    )
}