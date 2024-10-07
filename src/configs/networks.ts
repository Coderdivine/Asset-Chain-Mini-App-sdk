export const NETWORKS = {
    "assetchain_mainnet": {
        name: "Asset Chain Mainnet",
        addressType: "hex",
        chainId: 42420,
        currency: 'RWA',
        explorerUrl: 'https://scan.assetchain.org',
        rpcUrl: 'https://mainnet-rpc.assetchain.org'
    },
    "assetchain_testnet": {
        name: "Asset Chain Testnet",
        addressType: "hex",
        chainId: 42421, 
        currency: 'RWA', 
        explorerUrl: 'https://testnet-scan.assetchain.org',
        rpcUrl: 'https://testnet-rpc.assetchain.org'
    },
    "ton_mainnet": {
        name: "TON Mainnet",
        addressType: "base64", 
        chainId: 1, 
        currency: 'TON',
        explorerUrl: 'https://tonscan.org',
        rpcUrl: 'https://ton-rpc.org'
    },
    "eth": {
        id: "eip155:1",
        chainNamespace: "eip155",
        name: "Ethereum",
        addressType: "hex", 
        chainId: 1, 
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://ethereum.org'
    }
};
