"use client";

import { QueryClient, QueryClientProvider } from "react-query";

import { AuthContextProvider } from "@/utils/auth/AuthContext";

const queryClient = new QueryClient();

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </QueryClientProvider>
    );
}