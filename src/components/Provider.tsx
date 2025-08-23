'use client';

import { trpc } from "@/server/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { PropsWithChildren, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { makeQueryClient } from "@/server/query-client";

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: always make a new query client
        return makeQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= makeQueryClient());
}

export default function Provider({ children }: PropsWithChildren) {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: "http://localhost:3000/api/trpc"
            })
        ]
    }))
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >

                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </trpc.Provider >)
}