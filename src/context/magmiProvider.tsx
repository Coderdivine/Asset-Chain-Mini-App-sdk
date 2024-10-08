"use client";
import { wagmiConfig } from "@/configs/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//@ts-expect-error: Ignore wagmi's error
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24,
    },
  },
})

export default function AppKit({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return <div>
    <WagmiProvider config={wagmiConfig} reconnectOnMount={true} >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  </div>;
}
