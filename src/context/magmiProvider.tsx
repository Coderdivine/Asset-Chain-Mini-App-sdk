"use client";
import { wagmiConfig } from "@/configs/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
//@ts-expect-error: Ignore wagmi's error
import { WagmiProvider } from "wagmi";

export default function AppKit({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClientOptions = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1_000 * 60 * 60 * 24,
      },
    },
  });

  const [queryClient] = useState(() => queryClientOptions);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </div>
  );
}
