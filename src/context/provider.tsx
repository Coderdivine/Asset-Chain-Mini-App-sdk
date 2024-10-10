"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// @ts-expect-error: Ignore wagmi's error
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/configs/wagmiConfig";

const queryClientOptions = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24
    },
  },
});

export function AppKit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClientOptions}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
