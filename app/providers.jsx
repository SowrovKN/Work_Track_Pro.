"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Authprovider from "../src/components/firebase/AuthProvider";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Authprovider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Authprovider>
  );
}
