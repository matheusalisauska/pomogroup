import { auth } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });


  return { session };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router
export const procedure = trpc.procedure;

export const authProcedure = trpc.procedure.use(async function isAuthenticated(opts) {
    const {ctx} = opts;
    
    if (!ctx.session) {
        throw new TRPCError({code: 'UNAUTHORIZED', message: 'You must be logged in to access this resource.'});
    }

    return opts.next({
        ctx: {
            session: ctx.session
        }
    })
})