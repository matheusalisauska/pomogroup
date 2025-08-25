'use client';

import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function LeaveSession() {
    const utils = trpc.useUtils();
    const { mutate, isPending } = trpc.pomodoroSessions.leaveSession.useMutation({
        onSuccess: () => {
            utils.users.getUsersWithSession.invalidate();
        }
    });

    return (
        <button
            disabled={isPending}
            className="text-destructive"
            onClick={() => mutate()
            }>
            <LogOut size={20} />
        </button>
    )

}