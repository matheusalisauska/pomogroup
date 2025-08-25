import { LeaveSession } from "@/components/LeaveSession";
import { UserList } from "./_components/UserList";
import { SessionsList } from "@/components/SessionsList";
import { Pomodoro } from "./_components/Pomodoro";
import { Separator } from "@/components/ui/separator";
import { SessionChat } from "./_components/SessionChat";

export default function LobbyPage() {
    return (
        <div className="flex flex-col gap-y-4 mt-8  w-full ">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-semibold">Lobby</h1>
                <LeaveSession />
            </div>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                <div className="order-1">
                    <UserList />
                </div>
                <Pomodoro />
                <Separator className="lg:hidden" />
                <div className="flex flex-col gap-y-2">
                    <SessionChat />
                    <UserList />
                </div>
                {/* <SessionsList /> */}
            </div>
        </div>
    )
}