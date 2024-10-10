import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';
import { CreateConnectorFn } from '@wagmi/core';
import * as _tonconnect_ui from '@tonconnect/ui';
import * as _tonconnect_sdk from '@tonconnect/sdk';
export { TonConnectUIProvider } from '@tonconnect/ui-react';

declare const INFURA_KEY: string;
declare const PROJECT_ID: string;
declare const MANIFEST_URL: string;
declare const configs: {
    INFURA_KEY: string;
    PROJECT_ID: string;
    MANIFEST_URL: string;
};

declare const DashboardContext: React.Context<DashboardContextType>;
declare function AssetChainKit({ children, manifestUrl, projectId, infuraApiKey, metadata, defaultConnector, }: {
    children: ReactNode;
    manifestUrl?: string;
    projectId: string;
    infuraApiKey: string;
    metadata: any;
    defaultConnector?: CreateConnectorFn | undefined;
}): react_jsx_runtime.JSX.Element;

declare const useEvmWallet: ({ projectId, infuraApiKey, metadata, defaultConnector: defaultConnect }: EVM) => {
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

export { AssetChainKit, DashboardContext, INFURA_KEY, MANIFEST_URL, PROJECT_ID, concatAddress, configs, explorerLink, onCopy, sayHello, useEvmWallet, useTonWallet, verifyAddress };
