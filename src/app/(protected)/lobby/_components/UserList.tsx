'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/server/client";
import { EllipsisVertical } from "lucide-react";

export function UserList() {
    const { data: users, isLoading } = trpc.users.getUsersWithSession.useQuery(undefined, {

    });
    const participants = users?.currentSession?.participants

    if (isLoading) {
        return <UserListSkeleton />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="!text-lg">
                    Users
                </CardTitle>
                <CardDescription>
                    <p className="text-sm text-muted-foreground">Manage user sessions</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-6">
                {participants?.map((p, index) => (
                    <div key={index} className="flex items-center gap-x-4">
                        <Avatar className="size-9">
                            <AvatarImage src={p.image || undefined} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="leading-none">{p.name}</p>
                            <p className="text-sm text-muted-foreground">3 sessions</p>
                        </div>
                        <div className="ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="">
                                        <EllipsisVertical className="size-4.5" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

function UserListSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="!text-lg">Users</CardTitle>
                <CardDescription>
                    <p className="text-sm text-muted-foreground">Manage user sessions</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-x-4 ">
                        <Skeleton className="size-9 rounded-full" />
                        <div className="flex flex-col gap-y-2">
                            <Skeleton className="w-24 h-4  rounded"></Skeleton>
                            <Skeleton className="w-16 h-3  rounded"></Skeleton>
                        </div>
                        <Skeleton className="ml-auto w-6 h-6  rounded"></Skeleton>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}