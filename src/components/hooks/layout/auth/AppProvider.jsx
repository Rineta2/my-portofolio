import { QueryClientProvider } from "react-query";

import { AuthContextProvider } from "@/utils/auth/context/AuthContext";

export default function AppProviders({ queryClient, children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
}
