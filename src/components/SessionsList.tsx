'use client';
import { trpc } from "@/server/client";
import { EnterSession } from "./EnterSession";

export function SessionsList() {
    const { data: sessions } = trpc.pomodoroSessions.getAll.useQuery();

    if (!sessions) {
        return <p>invalido</p>
    }

    return (
        <div className="flex flex-col gap-y-4">
            {sessions.map((session) => (
                <div key={session.id} className="flex items-center gap-x-2">
                    <p>{session.id}</p>
                    <EnterSession id={session.id} />
                </div>
            ))}
        </div>
    )
}