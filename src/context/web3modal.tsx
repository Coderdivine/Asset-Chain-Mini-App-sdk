"use client";
// import { createAppKit } from "@reown/appkit/react";
// import { EthersAdapter } from "@reown/appkit-adapter-ethers";
// import { NETWORKS } from "@/configs/networks";
// import { arbitrum, mainnet } from "@reown/appkit/networks";
// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
// if (!projectId) {
//   throw new Error('Project ID is not defined')
// }
// const defaultNetwork = NETWORKS.assetchain_mainnet;

const metadata = {
  name: "Starter kit",
  description: "Asset Chain mini app starter kit",
  url: "https://walletconnect.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};


export default function AppKit({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
