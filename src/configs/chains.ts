import { type Chain } from 'viem'

export const AssetChainMainnet = {
  id: 42420,
  name: 'Asset Chain Mainnet',
  nativeCurrency: { name: 'assetchain', symbol: 'RWA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://mainnet-rpc.assetchain.org'] },
  },
  blockExplorers: {
    default: { name: 'assetchain', url: 'https://scan.assetchain.org' },
  }
} as const satisfies Chain

export const AssetChainTestnet = {
  id: 42421,
  name: 'Asset Chain Testnet',
  nativeCurrency: { name: 'assetchain', symbol: 'RWA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.assetchain.org'] },
  },
  blockExplorers: {
    default: { name: 'assetchain', url: 'https://testnet-scan.assetchain.org' },
  }
} as const satisfies Chain
