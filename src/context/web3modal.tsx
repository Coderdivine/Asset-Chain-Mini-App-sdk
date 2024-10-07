"use client";
import { createAppKit } from "@reown/appkit/react";
import dotenv from "dotenv";
dotenv.config();
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { NETWORKS } from "@/configs/networks";
import { arbitrum, mainnet } from "@reown/appkit/networks";
const projectId = process.env.NEXT_PROJECT_ID || "b6307caf0557efa438a85b8aa60cd87a";
if (!projectId) {
  throw new Error('Project ID is not defined')
}
const defaultNetwork = NETWORKS.assetchain_mainnet;

const metadata = {
  name: "Starter kit",
  description: "Asset Chain mini app starter kit",
  url: "https://walletconnect.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};



createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  //@ts-ignore
  defaultNetwork,
  projectId,
  features: {
    analytics: false,
  },
});

export default function AppKit({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
