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
  DashboardContext: () => DashboardContext,
  INFURA_KEY: () => INFURA_KEY,
  MANIFEST_URL: () => MANIFEST_URL,
  PROJECT_ID: () => PROJECT_ID,
  sayHello: () => sayHello
});
module.exports = __toCommonJS(src_exports);

// src/configs/index.ts
var INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY || "";
var PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "";
var MANIFEST_URL = process.env.NEXT_PUBLIC_MANIFEST_URL || "";

// src/pages/App.tsx
var import_react3 = __toESM(require("react"));

// src/hooks/useTonWallet.ts
var import_ui_react = require("@tonconnect/ui-react");
var import_react = require("react");
var import_tonweb = __toESM(require("tonweb"));
var tonWeb = new import_tonweb.default();

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

// src/pages/App.tsx
var import_ui_react2 = require("@tonconnect/ui-react");
var import_react_query = require("@tanstack/react-query");
var import_wagmi = require("wagmi");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DashboardContext,
  INFURA_KEY,
  MANIFEST_URL,
  PROJECT_ID,
  sayHello
});
