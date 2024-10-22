import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';
import { CreateConnectorFn } from '@wagmi/core';
import { Chain } from 'viem';
export { TonConnectUIProvider } from '@tonconnect/ui-react';
import * as _tonconnect_ui from '@tonconnect/ui';
import * as _tonconnect_sdk from '@tonconnect/sdk';

declare const INFURA_KEY: string;
declare const PROJECT_ID: string;
declare const MANIFEST_URL: string;
declare const configs: {
    INFURA_KEY: string;
    PROJECT_ID: string;
    MANIFEST_URL: string;
    NETWORKS: {
        assetchain_mainnet: {
            name: string;
            addressType: string;
            chainId: number;
            currency: string;
            explorerUrl: string;
            rpcUrl: string;
        };
        assetchain_testnet: {
            name: string;
            addressType: string;
            chainId: number;
            currency: string;
            explorerUrl: string;
            rpcUrl: string;
        };
        ton_mainnet: {
            name: string;
            addressType: string;
            chainId: number;
            currency: string;
            explorerUrl: string;
            rpcUrl: string;
        };
        eth: {
            id: string;
            chainNamespace: string;
            name: string;
            addressType: string;
            chainId: number;
            currency: string;
            explorerUrl: string;
            rpcUrl: string;
        };
    };
    AssetChainMainnet: {
        readonly id: 42420;
        readonly name: "Asset Chain Mainnet";
        readonly nativeCurrency: {
            readonly name: "assetchain";
            readonly symbol: "RWA";
            readonly decimals: 18;
        };
        readonly rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://mainnet-rpc.assetchain.org"];
            };
        };
        readonly blockExplorers: {
            readonly default: {
                readonly name: "assetchain";
                readonly url: "https://scan.assetchain.org";
            };
        };
    };
    AssetChainTestnet: {
        readonly id: 42421;
        readonly name: "Asset Chain Testnet";
        readonly nativeCurrency: {
            readonly name: "assetchain";
            readonly symbol: "RWA";
            readonly decimals: 18;
        };
        readonly rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://testnet-rpc.assetchain.org"];
            };
        };
        readonly blockExplorers: {
            readonly default: {
                readonly name: "assetchain";
                readonly url: "https://testnet-scan.assetchain.org";
            };
        };
    };
};

interface Network {
  name: string;
  addressType: string;
  chainId: number;
  id: string;
  chainNamespace: string;
  currency: string;
  explorerUrl: string;
  rpcUrl: string;
}

interface EVM {
  projectId: string, 
  infuraApiKey: string, 
  metadata: any; 
  network: Chain;
}

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

interface DashboardContextType {
  tonConnected: boolean;
  setTonConnected: (value: boolean) => void;
  evmConnected: boolean;
  setEvmConnected: (value: boolean) => void;
  selectedWallet: any;
  setSelectedWallet: any;
  disableTon: boolean;
  setDisableTon: (value: boolean) => void;
  disableEvm: boolean;
  setDisableEvm: (value: boolean) => void;
  processing: boolean;
  setProcessing: (value: boolean) => void;
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  walletConnected: boolean;
  setWalletConnected: (value: boolean) => void;
  handleSendTransaction: (amount: string, to: string ) => void;
  allowDisconnect: () => void;
}

declare const DashboardContext: React.Context<DashboardContextType>;
declare function AssetChainKit({ children, manifestUrl, projectId, infuraApiKey, metadata, defaultConnector, network }: {
    children: ReactNode;
    manifestUrl?: string;
    projectId: string;
    infuraApiKey: string;
    metadata: any;
    network: Chain;
    defaultConnector?: CreateConnectorFn | undefined;
}): react_jsx_runtime.JSX.Element;

declare const useEvmWallet: ({ projectId, infuraApiKey, metadata, network }: EVM) => {
    connectEvmWallet: () => Promise<void>;
    disconnectEvmWallet: () => Promise<void>;
    sendTransactionEvm: (txParams: any) => Promise<`0x${string}` | undefined>;
    evmAddress: `0x${string}` | undefined;
    isConnected: boolean;
    isConnecting: boolean;
};

declare const useTonWallet: () => {
    connectWallet: () => Promise<void>;
    disconnectWallet: () => Promise<void>;
    sendTransaction: (txParams: any) => Promise<_tonconnect_sdk.SendTransactionResponse | undefined>;
    userFriendlyAddress: string;
    tonConnected: boolean;
    state: _tonconnect_ui.WalletsModalState;
};

declare const useAssetChainConnect: () => DashboardContextType;

declare const concatAddress: (address: string) => string;

declare function explorerLink(network: Network, hash: string): {
    rawLink: string;
    turncateLink: string;
};

declare const onCopy: (text: string) => Promise<void>;

type AddressType = "hex" | "base64" | "invalid";
interface AddressResult {
    address: string;
    type: AddressType;
}
declare function verifyAddress(address: string): AddressResult;

declare const sayHello: () => Promise<string>;

export { AssetChainKit, DashboardContext, INFURA_KEY, MANIFEST_URL, PROJECT_ID, concatAddress, configs, explorerLink, onCopy, sayHello, useAssetChainConnect, useEvmWallet, useTonWallet, verifyAddress };
