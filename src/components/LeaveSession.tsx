'use client';

import { trpc } from "@/server/client";
import { Button } from "./ui/button";

export function LeaveSession() {
    const { mutate } = trpc.pomodoro.leaveSession.useMutation();

    return (
        <Button variant={'destructive'} className="w-fit" onClick={() => mutate()}>Leave session</Button>
    )

}