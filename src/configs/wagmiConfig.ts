import { http, createConfig, injected } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { coinbaseWallet, metaMask, walletConnect, MetaMaskParameters, CoinbaseWalletParameters, WalletConnectParameters } from '@wagmi/connectors'
import { INFURA_KEY, PROJECT_ID } from '.';
const projectId = PROJECT_ID;
const infuraAPIKey = INFURA_KEY;

const metamaskOptions: MetaMaskParameters = {
    dappMetadata: {
        name:"Asset Chain Starter kit"
    },
    enableAnalytics: false,
    infuraAPIKey,
    useDeeplink: true
}

const coinBaseOptions: CoinbaseWalletParameters = {
    appName:"Asset Chain Starter Kit"
}

const walletConnectOptions: WalletConnectParameters = {
    projectId
} 

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [ injected(), coinbaseWallet(coinBaseOptions), metaMask(metamaskOptions), walletConnect(walletConnectOptions)],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})