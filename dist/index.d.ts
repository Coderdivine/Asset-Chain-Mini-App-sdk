import React from 'react';
import { CreateConnectorFn } from '@wagmi/core';
import * as _tonconnect_ui from '@tonconnect/ui';
import * as _tonconnect_sdk from '@tonconnect/sdk';

declare const _default$2: {
    INFURA_KEY: string;
    PROJECT_ID: string;
    MANIFEST_URL: string;
};

declare function AssetChainKit({ children, manifestUrl, projectId, infuraApiKey, metadata, defaultConnector, }: Readonly<{
    children: React.ReactNode;
    manifestUrl: string;
    projectId: string;
    infuraApiKey: string;
    metadata: any;
    defaultConnector: CreateConnectorFn | undefined;
}>): React.JSX.Element;

declare const _default$1: {
    useEvmWallet: ({ projectId, infuraApiKey, metadata, defaultConnector: defaultConnect }: EVM) => {
        connectEvmWallet: () => Promise<void>;
        disconnectEvmWallet: () => Promise<void>;
        sendTransactionEvm: (txParams: any) => Promise<`0x${string}` | undefined>;
        evmAddress: `0x${string}` | undefined;
        isConnected: boolean;
        isConnecting: boolean;
    };
    useTonWallet: () => {
        connectWallet: () => Promise<void>;
        disconnectWallet: () => Promise<void>;
        sendTransaction: (txParams: any) => Promise<_tonconnect_sdk.SendTransactionResponse | undefined>;
        userFriendlyAddress: string;
        tonConnected: boolean;
        state: _tonconnect_ui.WalletsModalState;
    };
};

declare function explorerLink(network: Network, hash: string): {
    rawLink: string;
    turncateLink: string;
};

type AddressType = "hex" | "base64" | "invalid";
interface AddressResult {
    address: string;
    type: AddressType;
}
declare function verifyAddress(address: string): AddressResult;

declare const _default: {
    concatAddress: (address: string) => string;
    explorerLink: typeof explorerLink;
    onCopy: (text: string) => Promise<void>;
    verifyAddress: typeof verifyAddress;
};

declare const sayHello: () => Promise<void>;

export { AssetChainKit, _default$2 as config, sayHello, _default as utils, _default$1 as wallet };
