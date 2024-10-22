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
var AssetChainTestnet = {
  id: 42421,
  name: "Asset Chain Testnet",
  nativeCurrency: { name: "assetchain", symbol: "RWA", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.assetchain.org"] }
  },
  blockExplorers: {
    default: { name: "assetchain", url: "https://testnet-scan.assetchain.org" }
  }
};

// src/configs/networks.ts
var NETWORKS = {
  "assetchain_mainnet": {
    name: "Asset Chain Mainnet",
    addressType: "hex",
    chainId: 42420,
    currency: "RWA",
    explorerUrl: "https://scan.assetchain.org",
    rpcUrl: "https://mainnet-rpc.assetchain.org"
  },
  "assetchain_testnet": {
    name: "Asset Chain Testnet",
    addressType: "hex",
    chainId: 42421,
    currency: "RWA",
    explorerUrl: "https://testnet-scan.assetchain.org",
    rpcUrl: "https://testnet-rpc.assetchain.org"
  },
  "ton_mainnet": {
    name: "TON Mainnet",
    addressType: "base64",
    chainId: 1,
    currency: "TON",
    explorerUrl: "https://tonscan.org",
    rpcUrl: "https://ton-rpc.org"
  },
  "eth": {
    id: "eip155:1",
    chainNamespace: "eip155",
    name: "Ethereum",
    addressType: "hex",
    chainId: 1,
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://ethereum.org"
  }
};

// src/configs/index.ts
var INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY || "";
var PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "";
var MANIFEST_URL = process.env.NEXT_PUBLIC_MANIFEST_URL || "";
var configs = {
  INFURA_KEY,
  PROJECT_ID,
  MANIFEST_URL,
  NETWORKS,
  AssetChainMainnet,
  AssetChainTestnet
};

// src/pages/App.tsx
import { createContext, useEffect as useEffect3, useState as useState2 } from "react";

// src/utils/logConsole.tsx
var debugMode = false;
var logConsole = (...args) => {
  if (debugMode) {
    return console.log(...args);
  }
  return;
};

// src/hooks/useTonWallet.ts
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI
} from "@tonconnect/ui-react";
import { useContext, useEffect } from "react";
import TonWeb from "tonweb";
var tonWeb = new TonWeb();
var useTonWallet = () => {
  const { state, open, close } = useTonConnectModal();
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  const { tonConnected, setTonConnected, setSelectedWallet, setProcessing } = dashboardContext;
  const selectWallet = (wallet_) => {
    const wallet = wallet_.toLocaleLowerCase();
    logConsole({ wallet });
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
  useEffect(() => {
    logConsole({ state });
    if (state.closeReason == "action-cancelled") {
      setTonConnected(false);
    }
    if (state.closeReason == "wallet-selected") {
      setTonConnected(true);
      selectWallet("ton");
    }
    if (state.closeReason == null && userFriendlyAddress.length) {
      setTonConnected(true);
    }
    if (state.closeReason == "action-cancelled" && !userFriendlyAddress.length) {
      setTonConnected(false);
      selectWallet("no_wallet");
    }
  }, [state]);
  const connectWallet = async () => {
    setProcessing(true);
    try {
      selectWallet("ton");
      await open();
      logConsole({ userFriendlyAddress, rawAddress });
    } catch (error) {
      logConsole({ error });
    }
    setProcessing(false);
  };
  const disconnectWallet = async () => {
    try {
      if (userFriendlyAddress.length) {
        await tonConnectUI.disconnect();
        await close();
        setTonConnected(false);
        setTonConnected(false);
        setSelectedWallet();
      } else {
        logConsole({ message: "Connect wallet first" });
        setTonConnected(false);
      }
    } catch (error) {
      logConsole({ error });
    }
  };
  const sendTransaction2 = async (txParams) => {
    try {
      txParams.from = userFriendlyAddress;
      const value = tonWeb.utils.toNano(txParams.value);
      logConsole({ value });
      const tx = await tonConnectUI.sendTransaction({
        validUntil: Date.now() + 1e6,
        messages: [
          {
            address: txParams.to,
            amount: value.toString()
          }
        ]
      });
      return tx;
    } catch (error) {
      console.error("Transaction failed" + error.message);
    }
  };
  return {
    connectWallet,
    disconnectWallet,
    sendTransaction: sendTransaction2,
    userFriendlyAddress,
    tonConnected,
    state
  };
};

// src/hooks/useEvmWallet.ts
import { useContext as useContext2, useEffect as useEffect2 } from "react";
import {
  getAccount,
  connect,
  disconnect,
  sendTransaction,
  reconnect,
  switchChain
} from "@wagmi/core";
import { parseEther, parseGwei } from "viem";

// src/configs/wagmiConfig.ts
import { http, createConfig, injected } from "@wagmi/core";
import { coinbaseWallet } from "@wagmi/connectors";
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
var useEvmWallet = ({ projectId, infuraApiKey, metadata, network }) => {
  const metamaskOptions = {
    enableAnalytics: true,
    extensionOnly: false,
    infuraAPIKey: infuraApiKey,
    useDeeplink: true
  };
  const walletConnectOptions = {
    projectId,
    metadata,
    isNewChainsStale: true,
    disableProviderPing: false,
    customStoragePrefix: "wagmi",
    qrModalOptions: {
      themeMode: "light"
    }
  };
  const metaMaskConfig = metaMask(metamaskOptions);
  const walletConnectConfig = walletConnect(walletConnectOptions);
  const {
    address,
    chain,
    chainId,
    connector,
    isConnecting,
    status,
    isConnected
  } = getAccount(wagmiConfig);
  const dashboardContext = useContext2(DashboardContext);
  const defaultConnector = walletConnectConfig;
  const defaultChainId = AssetChainMainnet.id;
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
    setProcessing
  } = dashboardContext;
  useEffect2(() => {
    logConsole({
      evmState: status,
      address,
      connector,
      isConnecting,
      isConnected
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
  const selectWallet = (wallet_) => {
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
        const result = await connect(wagmiConfig, { connector: defaultConnector, chainId: defaultChainId });
        if (result) {
          logConsole({ result });
          setEvmConnected(true);
          selectWallet("assetchain");
        }
      } else {
        logConsole("Wallet connected");
        selectWallet("assetchain");
      }
    } catch (error) {
      logConsole({ error });
    }
    setProcessing(false);
  };
  const disconnectEvmWallet = async () => {
    try {
      await disconnect(wagmiConfig);
      setEvmConnected(false);
    } catch (error) {
      logConsole({ error });
    }
  };
  const sendTransactionEvm = async (txParams) => {
    try {
      if (defaultChainId !== chainId) {
        logConsole("ChainId mismatch");
        await switchChain(wagmiConfig, { chainId: defaultChainId });
        return;
      }
      const result = await sendTransaction(wagmiConfig, {
        to: txParams.to,
        gas: parseGwei("20"),
        value: parseEther(txParams.value)
      });
      if (result) {
        logConsole({ sendTransactionEvm: result });
      }
      return result;
    } catch (error) {
      console.error({ error });
      logConsole("Something went wrong");
    }
  };
  const allowReconnect = async () => {
    try {
      const result = await reconnect(wagmiConfig, {
        connectors: [defaultConnector]
      });
      if (result) {
        logConsole({ allowReconnect: result });
      }
    } catch (error) {
      logConsole({ allowReconnectError: error });
    }
  };
  useEffect2(() => {
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
    isConnecting
  };
};

// src/pages/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { jsx } from "react/jsx-runtime";
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
  disableEvm: false,
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
function AssetChainKit({
  children,
  manifestUrl,
  projectId,
  infuraApiKey,
  metadata,
  defaultConnector,
  network
}) {
  const [tonConnected, setTonConnected] = useState2(false);
  const [evmConnected, setEvmConnected] = useState2(false);
  const [selectedWallet, setSelectedWallet] = useState2(
    NETWORKS.assetchain_mainnet
  );
  const [disableTon, setDisableTon] = useState2(false);
  const [disableEvm, setDisableEvm] = useState2(false);
  const [processing, setProcessing] = useState2(false);
  const [isConnected, setIsConnected] = useState2(false);
  const [walletConnected, setWalletConnected] = useState2(false);
  const { disconnectWallet, sendTransaction: sendTransaction2 } = useTonWallet();
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
  const selectWallet = (wallet_) => {
    const wallet = wallet_.toLocaleLowerCase();
    logConsole({ wallet });
    if (wallet == "assetchain") {
      setSelectedWallet(NETWORKS.assetchain_mainnet);
    }
    if (wallet == "ton") {
      setSelectedWallet(NETWORKS.ton_mainnet);
    }
  };
  useEffect3(() => {
    onlyOneWallet();
  }, [tonConnected, evmConnected]);
  useEffect3(() => {
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
    const actions = {
      RWA: disconnectEvmWallet,
      TON: disconnectWallet
    };
    const currency = selectedWallet?.currency;
    if (currency && actions[currency]) {
      await actions[currency]();
      setDisableEvm(false);
      setDisableTon(false);
      setWalletConnected(false);
    }
  };
  const handleSendTransaction = async (amount, to) => {
    const sendAmount = amount;
    const recipientAddress = to;
    try {
      if (selectedWallet) {
        if (tonConnected || evmConnected) {
          if (selectedWallet.currency == "TON") {
            const tx = await sendTransaction2({
              value: sendAmount,
              to: recipientAddress
            });
            return tx;
          }
          if (selectedWallet.currency == "RWA") {
            const tx = await sendTransactionEvm({
              value: sendAmount,
              to: recipientAddress
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
  return /* @__PURE__ */ jsx(WagmiProvider, { config: wagmiConfig, children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClientOptions, children: /* @__PURE__ */ jsx(
    DashboardContext.Provider,
    {
      value: {
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
        allowDisconnect
      },
      children
    }
  ) }) });
}

// src/hooks/index.ts
import { useContext as useContext3 } from "react";
var useAssetChainConnect = () => {
  const context = useContext3(DashboardContext);
  if (!context) {
    throw new Error("useAssetChainConnect must be used within AssetChainKit");
  }
  return context;
};

// src/utils/concatAddress.ts
var concatAddress = (address) => {
  return address.length ? address.substring(0, 4).concat("...").concat(address.substring(address.length - 4, address.length)) : "";
};

// src/utils/explorerLink.ts
function explorerLink(network, hash) {
  const rawLink = network.explorerUrl.concat("/tx/").concat(hash);
  const turncateLink = concatAddress(network.explorerUrl).concat("/tx/").concat(concatAddress(hash));
  return {
    rawLink,
    turncateLink
  };
}

// src/utils/onCopy.ts
var onCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied");
  } catch (error) {
    console.log({ error });
  }
};

// src/utils/validateAddress.ts
function verifyAddress(address) {
  const hexRegex = /^0x[a-fA-F0-9]{40}$/;
  const base64Regex = /^[A-Za-z0-9+/=]{44}$/;
  if (hexRegex.test(address)) {
    return { address, type: "hex" };
  } else if (base64Regex.test(address)) {
    return { address, type: "base64" };
  } else {
    return { address, type: "invalid" };
  }
}

// src/test.ts
var sayHello = async () => {
  return "Asset Chain connect!";
};

// src/index.ts
import { TonConnectUIProvider } from "@tonconnect/ui-react";
export {
  AssetChainKit,
  AssetChainMainnet,
  AssetChainTestnet,
  DashboardContext,
  INFURA_KEY,
  MANIFEST_URL,
  PROJECT_ID,
  TonConnectUIProvider,
  concatAddress,
  configs,
  explorerLink,
  onCopy,
  sayHello,
  useAssetChainConnect,
  useEvmWallet,
  useTonWallet,
  verifyAddress
};
