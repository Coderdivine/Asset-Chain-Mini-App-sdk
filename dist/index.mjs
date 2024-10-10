// src/configs/index.ts
var INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY || "";
var PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "";
var MANIFEST_URL = process.env.NEXT_PUBLIC_MANIFEST_URL || "";

// src/pages/App.tsx
import React, { createContext, useEffect as useEffect3, useState as useState2 } from "react";

// src/hooks/useTonWallet.ts
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI
} from "@tonconnect/ui-react";
import { useContext, useEffect } from "react";
import TonWeb from "tonweb";
var tonWeb = new TonWeb();

// src/hooks/useEvmWallet.ts
import { useContext as useContext2, useEffect as useEffect2 } from "react";
import {
  getAccount,
  connect,
  disconnect,
  sendTransaction,
  reconnect
} from "@wagmi/core";
import { parseEther, parseGwei } from "viem";

// src/configs/wagmiConfig.ts
import { http, createConfig, injected } from "@wagmi/core";
import { coinbaseWallet } from "@wagmi/connectors";

// src/configs/chains.ts
var AssetChainMainnet = {
  id: 42420,
  name: "Asset Chain Mainnet",
  nativeCurrency: { name: "assetchain", symbol: "RWA", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.assetchain.org"] }
  },
  blockExplorers: {
    default: { name: "assetchain", url: "https://scan.assetchain.org" }
  }
};

// src/configs/wagmiConfig.ts
var coinBaseOptions = {
  appName: "Asset Chain Starter Kit"
};
var coinbaseConfig = coinbaseWallet(coinBaseOptions);
var wagmiConfig = createConfig({
  chains: [AssetChainMainnet],
  connectors: [coinbaseConfig, injected()],
  ssr: true,
  transports: {
    [AssetChainMainnet.id]: http()
  }
});

// src/hooks/useEvmWallet.ts
import { metaMask, walletConnect } from "@wagmi/connectors";

// src/pages/App.tsx
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
var queryClientOptions = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1e3 * 60 * 60 * 24
    }
  }
});
var DashboardContext = createContext({
  tonConnected: false,
  setTonConnected: () => {
  },
  evmConnected: false,
  setEvmConnected: () => {
  },
  selectedWallet: {},
  setSelectedWallet: () => {
  },
  disableTon: false,
  setDisableTon: () => {
  },
  disbleEvm: false,
  setDisableEvm: () => {
  },
  processing: false,
  setProcessing: () => {
  },
  isConnected: false,
  setIsConnected: () => {
  },
  walletConnected: false,
  setWalletConnected: () => {
  },
  handleSendTransaction: () => {
  },
  allowDisconnect: () => {
  }
});

// src/test.ts
var sayHello = async () => {
  console.log("Asset Chain connect!");
};
export {
  DashboardContext,
  INFURA_KEY,
  MANIFEST_URL,
  PROJECT_ID,
  sayHello
};
