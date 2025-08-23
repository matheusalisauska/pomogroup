'use client';

import { authClient } from "@/lib/auth-client"

export default function SignInPage() {
    const handleLogin = async () => {
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/lobby'
        })
    }
    return (
        <div>
            <button onClick={handleLogin}>
                Logar com google
            </button>
        </div>
    )
}