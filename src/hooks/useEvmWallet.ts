"use client";

import { useContext, useEffect } from "react";
import { DashboardContext } from "@/pages/App";
import { NETWORKS } from "@/configs/networks";
import {
  getAccount,
  connect,
  disconnect,
  sendTransaction,
  reconnect,
  switchChain,
} from "@wagmi/core";
import { parseEther, parseGwei } from "viem";
import {
  wagmiConfig as config,
} from "../configs/wagmiConfig";
import { AssetChainMainnet, AssetChainTestnet } from "@/configs/chains";
import { logConsole } from "@/utils/logConsole";
import { metaMask, MetaMaskParameters, walletConnect, WalletConnectParameters } from "@wagmi/connectors";
import { EVM } from "@/global";

export const useEvmWallet = ({ projectId, infuraApiKey, metadata, network }: EVM) => {
  const metamaskOptions: MetaMaskParameters = {
    enableAnalytics: true,
    extensionOnly: false,
    infuraAPIKey: infuraApiKey,
    useDeeplink: true,
  }
  
  const walletConnectOptions: WalletConnectParameters = {
  projectId,
  metadata,
  isNewChainsStale: true,
  disableProviderPing: false, 
  customStoragePrefix: 'wagmi',
  qrModalOptions: { 
      themeMode: 'light', 
  }, 
  }

  const metaMaskConfig = metaMask(metamaskOptions);
  const walletConnectConfig = walletConnect(walletConnectOptions);

  const {
    address,
    chain,
    chainId,
    connector,
    isConnecting,
    status,
    isConnected,
  } = getAccount(config);
  const dashboardContext = useContext(DashboardContext);
  const defaultConnector = walletConnectConfig;
  const defaultChainId = network.id == 42420 ? AssetChainMainnet.id: AssetChainTestnet.id;
  if (!dashboardContext) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  const {
    evmConnected,
    setEvmConnected,
    setSelectedWallet,
    selectedWallet,
    setProcessing,
  } = dashboardContext;

  useEffect(() => {
    logConsole({
      evmState: status,
      address,
      connector,
      isConnecting,
      isConnected,
    });
    if (status == "connected") {
      setEvmConnected(true);
      selectWallet("assetchain");
    }
    if (status == "disconnected") {
      setEvmConnected(false);
      selectWallet("no_wallet");
    }

    if (isConnected) {
      setEvmConnected(true);
      selectWallet("assetchain");
    }
  }, [status, isConnected]);

  const selectWallet = (wallet_: string) => {
    const wallet = wallet_.toLocaleLowerCase();
    if (wallet == "assetchain") {
      setSelectedWallet(NETWORKS.assetchain_mainnet);
    }
    if (wallet == "ton") {
      setSelectedWallet(NETWORKS.ton_mainnet);
    }
    if (wallet == "no_wallet") {
      setSelectedWallet();
    }
  };

  const connectEvmWallet = async () => {
    setProcessing(true);
    try {
      if (!isConnected) {
        logConsole("Connect EVM wallet");
        const result = await connect(config, { connector: defaultConnector, chainId: defaultChainId });
        if (result) {
          logConsole({ result });
          setEvmConnected(true);
          selectWallet("assetchain");
        }
      } else {
        logConsole("Wallet connected");
        selectWallet("assetchain");
      }
    } catch (error: any) {
      logConsole({ error });
    }
    setProcessing(false);
  };

  const disconnectEvmWallet = async () => {
    try {
      await disconnect(config);
      setEvmConnected(false);
    } catch (error: any) {
      logConsole({ error });
    }
  };

  const sendTransactionEvm = async (txParams: any) => {
    try {
      if (defaultChainId !== chainId) {
        logConsole("ChainId mismatch");
        await switchChain(config, { chainId: defaultChainId });
        return;
      }

      const result = await sendTransaction(config, {
        to: txParams.to,
        gas: parseGwei("20"),
        value: parseEther(txParams.value),
      });
      if (result) {
        logConsole({ sendTransactionEvm: result });
      }
      return result;
    } catch (error: any) {
      console.error({ error });
      logConsole("Something went wrong");
    }
  };

  const allowReconnect = async () => {
    try {
      const result = await reconnect(config, {
        connectors: [defaultConnector],
      });
      if (result) {
        logConsole({ allowReconnect: result });
      }
    } catch (error: any) {
      logConsole({ allowReconnectError: error });
    }
  };

  useEffect(() => {
    if (!isConnected) {
      allowReconnect();
    }
  }, [isConnected]);

  return {
    connectEvmWallet,
    disconnectEvmWallet,
    sendTransactionEvm,
    evmAddress: address,
    isConnected,
    isConnecting,
  };
};
