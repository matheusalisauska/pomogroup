import { LeaveSession } from "@/components/LeaveSession";
import { UserList } from "./_components/UserList";
import { SessionsList } from "@/components/SessionsList";

export default function LobbyPage() {
    return (
        <div className="flex flex-col gap-y-4 mt-8 container-wide w-full">
            <h1 className="text-2xl font-semibold">Lobby</h1>
            <SessionsList />
            <LeaveSession />
            <div className="flex flex-col gap-y-2">
                <UserList />
            </div>
        </div>
    )
}