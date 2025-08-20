import z from "zod";
import { authProcedure, procedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";

export const userRouter = router({
    getUsers: authProcedure.query(async({ctx}) => {
        console.log('SESH',ctx.session)
      return await prisma.user.findMany()
    }),
    addUser: procedure.input(z.object({name: z.string()})).mutation(({ input }) => {
        return {
            id: 'some-unique-id',
            name: input.name
        };
    })
})
