import React, { createContext, ReactNode, useEffect, useState } from "react";
import { logConsole } from "@/utils/logConsole";
import { NETWORKS } from "@/configs/networks";
import { useTonWallet } from "@/hooks/useTonWallet";
import { useEvmWallet } from "@/hooks/useEvmWallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/configs/wagmiConfig";
import { CreateConnectorFn } from "@wagmi/core";
import { Chain } from "viem";
import { DashboardContextType } from "@/global";

const queryClientOptions = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24,
    },
  },
});

export const DashboardContext = createContext<DashboardContextType>({
  tonConnected: false,
  setTonConnected: () => {},
  evmConnected: false,
  setEvmConnected: () => {},
  selectedWallet: {},
  setSelectedWallet: () => {},
  disableTon: false,
  setDisableTon: () => {},
  disableEvm: false,
  setDisableEvm: () => {},
  processing: false,
  setProcessing: () => {},
  isConnected: false,
  setIsConnected: () => {},
  walletConnected: false,
  setWalletConnected: () => {},
  handleSendTransaction: () => {},
  allowDisconnect: () => {},
});

export function AssetChainKit({
  children,
  manifestUrl,
  projectId,
  infuraApiKey,
  metadata,
  defaultConnector,
  network
}:{
  children: ReactNode;
  manifestUrl?: string;
  projectId: string;
  infuraApiKey: string;
  metadata: any;
  network: Chain;
  defaultConnector?: CreateConnectorFn | undefined;
}) {

  const [tonConnected, setTonConnected] = useState(false);
  const [evmConnected, setEvmConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(
    NETWORKS.assetchain_mainnet
  );
  const [disableTon, setDisableTon] = useState(false);
  const [disableEvm, setDisableEvm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const { disconnectWallet, sendTransaction } = useTonWallet();
  const { disconnectEvmWallet, sendTransactionEvm } = useEvmWallet({
    projectId,
    infuraApiKey,
    metadata,
    network
  });

  const onlyOneWallet = () => {
    if (tonConnected) {
      setDisableEvm(true);
    }
    if (evmConnected) {
      setDisableTon(true);
    }
  };

  const selectWallet = (wallet_: string) => {
    const wallet = wallet_.toLocaleLowerCase();
    logConsole({ wallet });
    if (wallet == "assetchain") {
      setSelectedWallet(NETWORKS.assetchain_mainnet);
    }
    if (wallet == "ton") {
      setSelectedWallet(NETWORKS.ton_mainnet);
    }
  };

  useEffect(() => {
    onlyOneWallet();
  }, [tonConnected, evmConnected]);

  useEffect(() => {
    if (tonConnected || evmConnected) {
      setWalletConnected(true);
      if (tonConnected) {
        selectWallet("ton");
      }
      if (evmConnected) {
        selectWallet("assetchain");
      }
    } else {
      setWalletConnected(false);
    }
    if (selectedWallet) {
      setWalletConnected(true);
    }
  }, [tonConnected, evmConnected, selectedWallet]);

  const allowDisconnect = async () => {
    if (!selectedWallet) return;

    const actions: { [key: string]: () => Promise<void> } = {
      RWA: disconnectEvmWallet,
      TON: disconnectWallet,
    };

    const currency: keyof typeof actions =
      selectedWallet?.currency as keyof typeof actions;

    if (currency && actions[currency]) {
      await actions[currency]();
      setDisableEvm(false);
      setDisableTon(false);
      setWalletConnected(false);
    }
  };

  const handleSendTransaction = async (amount: string, to: string) => {
    const sendAmount = amount;
    const recipientAddress = to;
    try {
      if (selectedWallet) {
        if (tonConnected || evmConnected) {
          if (selectedWallet.currency == "TON") {
            const tx = await sendTransaction({
              value: sendAmount,
              to: recipientAddress,
            });
            return tx;
          }

          if (selectedWallet.currency == "RWA") {
            const tx = await sendTransactionEvm({
              value: sendAmount,
              to: recipientAddress,
            });
            return tx;
          }
        }
      } else {
        console.error("Connect a wallet first");
      }
    } catch (error) {
      logConsole({ error });
    }
  };

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClientOptions}>
          <DashboardContext.Provider
            value={{
              tonConnected,
              setTonConnected,
              evmConnected,
              setEvmConnected,
              selectedWallet,
              setSelectedWallet,
              disableTon,
              setDisableTon,
              disableEvm,
              setDisableEvm,
              processing,
              setProcessing,
              isConnected,
              setIsConnected,
              walletConnected,
              setWalletConnected,
              handleSendTransaction,
              allowDisconnect,
            }}
          >
            {children}
          </DashboardContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
