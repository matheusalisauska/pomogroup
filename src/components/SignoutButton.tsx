'use client';

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
    const router = useRouter();
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    }
    return (
        <button onClick={handleLogout}>
            <LogOut />
        </button>
    )
}