import SignoutButton from "@/components/SignoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export default async function ProtectedHeader() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <header className="flex items-center w-full px-4 py-2 mt-4 lg:mt-2 bg-card border rounded">
            <div className="bg-white rounded-full size-8"></div>
            <div className="ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={session?.user?.image || undefined} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <ThemeToggle />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <SignoutButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}