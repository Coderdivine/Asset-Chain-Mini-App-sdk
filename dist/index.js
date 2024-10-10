"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AssetChainKit: () => AssetChainKit,
  DashboardContext: () => DashboardContext,
  INFURA_KEY: () => INFURA_KEY,
  MANIFEST_URL: () => MANIFEST_URL,
  PROJECT_ID: () => PROJECT_ID,
  TonConnectUIProvider: () => import_ui_react2.TonConnectUIProvider,
  concatAddress: () => concatAddress,
  configs: () => configs,
  explorerLink: () => explorerLink,
  onCopy: () => onCopy,
  sayHello: () => sayHello,
  useEvmWallet: () => useEvmWallet,
  useTonWallet: () => useTonWallet,
  verifyAddress: () => verifyAddress
});
module.exports = __toCommonJS(src_exports);

// src/configs/index.ts
var INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY || "";
var PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "";
var MANIFEST_URL = process.env.NEXT_PUBLIC_MANIFEST_URL || "";
var configs = {
  INFURA_KEY,
  PROJECT_ID,
  MANIFEST_URL
};

// src/pages/App.tsx
var import_react3 = require("react");

// src/utils/logConsole.tsx
var debugMode = false;
var logConsole = (...args) => {
  if (debugMode) {
    return console.log(...args);
  }
  return;
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

// src/hooks/useTonWallet.ts
var import_ui_react = require("@tonconnect/ui-react");
var import_react = require("react");
var import_tonweb = __toESM(require("tonweb"));
var tonWeb = new import_tonweb.default();
var useTonWallet = () => {
  const { state, open, close } = (0, import_ui_react.useTonConnectModal)();
  const [tonConnectUI] = (0, import_ui_react.useTonConnectUI)();
  const userFriendlyAddress = (0, import_ui_react.useTonAddress)();
  const rawAddress = (0, import_ui_react.useTonAddress)(false);
  const dashboardContext = (0, import_react.useContext)(DashboardContext);
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
  (0, import_react.useEffect)(() => {
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
var import_react2 = require("react");
var import_core2 = require("@wagmi/core");
var import_viem = require("viem");

// src/configs/wagmiConfig.ts
var import_core = require("@wagmi/core");
var import_connectors = require("@wagmi/connectors");

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
var coinbaseConfig = (0, import_connectors.coinbaseWallet)(coinBaseOptions);
var wagmiConfig = (0, import_core.createConfig)({
  chains: [AssetChainMainnet],
  connectors: [coinbaseConfig, (0, import_core.injected)()],
  ssr: true,
  transports: {
    [AssetChainMainnet.id]: (0, import_core.http)()
  }
});

// src/hooks/useEvmWallet.ts
var import_connectors2 = require("@wagmi/connectors");
var useEvmWallet = ({ projectId, infuraApiKey, metadata, defaultConnector: defaultConnect }) => {
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
  const metaMaskConfig = (0, import_connectors2.metaMask)(metamaskOptions);
  const walletConnectConfig = (0, import_connectors2.walletConnect)(walletConnectOptions);
  const {
    address,
    chain,
    chainId,
    connector,
    isConnecting,
    status,
    isConnected
  } = (0, import_core2.getAccount)(wagmiConfig);
  const dashboardContext = (0, import_react2.useContext)(DashboardContext);
  const defaultConnector = defaultConnect || walletConnectConfig;
  const switchChain = (chainId2) => {
  };
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
  (0, import_react2.useEffect)(() => {
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
        const result = await (0, import_core2.connect)(wagmiConfig, { connector: defaultConnector });
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
      await (0, import_core2.disconnect)(wagmiConfig);
      setEvmConnected(false);
    } catch (error) {
      logConsole({ error });
    }
  };
  const sendTransactionEvm = async (txParams) => {
    try {
      if (AssetChainMainnet.id !== chainId) {
        logConsole("ChainId mismatch");
        await switchChain({ chainId: AssetChainMainnet.id });
        return;
      }
      const result = await (0, import_core2.sendTransaction)(wagmiConfig, {
        to: txParams.to,
        gas: (0, import_viem.parseGwei)("20"),
        value: (0, import_viem.parseEther)(txParams.value)
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
      const result = await (0, import_core2.reconnect)(wagmiConfig, {
        connectors: [defaultConnector]
      });
      if (result) {
        logConsole({ allowReconnect: result });
      }
    } catch (error) {
      logConsole({ allowReconnectError: error });
    }
  };
  (0, import_react2.useEffect)(() => {
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
var import_react_query = require("@tanstack/react-query");
var import_wagmi = require("wagmi");
var import_jsx_runtime = require("react/jsx-runtime");
var queryClientOptions = new import_react_query.QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1e3 * 60 * 60 * 24
    }
  }
});
var DashboardContext = (0, import_react3.createContext)({
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
  defaultConnector
}) {
  const [tonConnected, setTonConnected] = (0, import_react3.useState)(false);
  const [evmConnected, setEvmConnected] = (0, import_react3.useState)(false);
  const [selectedWallet, setSelectedWallet] = (0, import_react3.useState)(
    NETWORKS.assetchain_mainnet
  );
  const [disableTon, setDisableTon] = (0, import_react3.useState)(false);
  const [disableEvm, setDisableEvm] = (0, import_react3.useState)(false);
  const [processing, setProcessing] = (0, import_react3.useState)(false);
  const [isConnected, setIsConnected] = (0, import_react3.useState)(false);
  const [walletConnected, setWalletConnected] = (0, import_react3.useState)(false);
  const { disconnectWallet, sendTransaction: sendTransaction2 } = useTonWallet();
  const { disconnectEvmWallet, sendTransactionEvm } = useEvmWallet({
    projectId,
    infuraApiKey,
    metadata,
    defaultConnector
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
  (0, import_react3.useEffect)(() => {
    onlyOneWallet();
  }, [tonConnected, evmConnected]);
  (0, import_react3.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_wagmi.WagmiProvider, { config: wagmiConfig, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_query.QueryClientProvider, { client: queryClientOptions, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_ui_react2 = require("@tonconnect/ui-react");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AssetChainKit,
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
  useEvmWallet,
  useTonWallet,
  verifyAddress
});
