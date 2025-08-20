'use client'

import { authClient } from "@/lib/auth-client";
import { prisma } from "@/lib/prisma";
import { trpc } from "@/server/client";

export default function Home() {
  const getUsers = trpc.users.getUsers.useQuery();
  const { data: session } = authClient.useSession();
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/joaozin'
    })
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <p>{session?.user.email}</p>
      <p>{JSON.stringify(getUsers.data)}</p>
      <button onClick={handleLogin}>
        Logar com google
      </button>
    </div>
  );
}
