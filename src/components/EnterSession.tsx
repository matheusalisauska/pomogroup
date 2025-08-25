'use client';

import { trpc } from "@/server/client";
import { Button } from "./ui/button";

interface EnterSessionProps {
    id: string;
}

export function EnterSession({ id }: EnterSessionProps) {
    const utils = trpc.useUtils();
    const { mutate, isPending } = trpc.pomodoroSessions.enterSession.useMutation({
        onSuccess: () => {
            utils.users.getUsersWithSession.invalidate();
        }
    });

    return (
        <Button className="w-fit" disabled={isPending} onClick={() => mutate({ id })}>{isPending ? 'Entering...' : 'Enter session'}</Button>
    )

}