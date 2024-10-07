import { useAppKit, useAppKitAccount, useAppKitState, useWalletInfo } from '@reown/appkit/react'
import { useAppKitEvents } from '@reown/appkit/react'
import { createAppKit } from '@reown/appkit/react'
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "@/pages/App";
import { NETWORKS } from '@/configs/networks';
import { mainnet, sepolia } from "@reown/appkit/networks";
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error('Project ID is not defined')
}
const defaultNetwork = NETWORKS.eth;
console.log({ defaultNetwork });

const metadata = {
  name: "Starter kit",
  description: "Asset Chain mini app starter kit",
  url: "https://walletconnect.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};




export const useEvmWallet = () => {
  const modal = createAppKit({
    adapters: [new EthersAdapter()],
    networks:[mainnet, sepolia],
    metadata,
    //@ts-expect-error
    defaultNetwork,
    enableInjected: true,
    enableWalletConnect:true,
    enableWallets:true,
    enableEIP6963:true,
    enableCoinbase: true,
    allowUnsupportedChain: true,
    allWallets:"SHOW",
    projectId,
    features: {
      analytics: true,
      onramp:false
    },
  });
  const { open, close } = useAppKit()
  const { walletInfo } = useWalletInfo();
  const { address, isConnected } = useAppKitAccount();
  const { selectedNetworkId } = useAppKitState();
  const events = useAppKitEvents()
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  const { evmConnected, setEvmConnected, setSelectedWallet } = dashboardContext;

  useEffect(() => {
    console.log({ isConnected, events });
  }, [ isConnected, events ]);


  const selectWallet = (wallet_: string) => {
    const wallet = wallet_.toLocaleLowerCase();
    if(wallet == "assetchain"){
      setSelectedWallet(NETWORKS.assetchain_mainnet);
    }
    if(wallet == "ton") {
      setSelectedWallet(NETWORKS.ton_mainnet);
    }
  }

  const connectEvmWallet = async () => {
    try {
      await open({ view: 'Connect' });
      console.log({ walletInfo });
    } catch (error: any) {
      console.log({ error });
    }
  };

  const disconnectEvmWallet = async () => {
    try {
      await close();
    } catch (error: any) {
      console.log({ error });
    }
  };

  const sendTransaction = async (txParams: any) => {
    try {
      // send tx here
    } catch (error: any) {
      console.error("Transaction failed" + error.message);
    }
  };

  return {
    connectEvmWallet,
    disconnectEvmWallet,
    sendTransaction,
    evmAddress: address
  };
};
