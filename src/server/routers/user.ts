import z from "zod";
import { authProcedure, procedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";


export const userRouter = router({
    getUsers: authProcedure.query(async({ctx}) => {
      return await prisma.user.findMany()
    }),
    getUsersWithSession: authProcedure.query(async({ctx}) => {
        return await prisma.user.findUnique({
            where: {id: ctx.session.user.id},
            include: {
          currentSession: {
            include: {
                participants: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
                },
            },
            },
            }
        })
    }),
    addUser: procedure.input(z.object({name: z.string()})).mutation(({ input }) => {
        return {
            id: 'some-unique-id',
            name: input.name
        };
    })
})
