import { http, createConfig, injected } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { coinbaseWallet, metaMask, walletConnect, MetaMaskParameters, CoinbaseWalletParameters, WalletConnectParameters } from '@wagmi/connectors'
import { INFURA_KEY, PROJECT_ID } from '.';
import { AssetChainMainnet } from './chains';
const projectId = PROJECT_ID;
const infuraAPIKey = INFURA_KEY;

const metamaskOptions: MetaMaskParameters = {
    dappMetadata: {
        name:"Asset Chain Starter kit"
    },
    enableAnalytics: true,
    extensionOnly: false,
    infuraAPIKey,
    useDeeplink: true,
}

const coinBaseOptions: CoinbaseWalletParameters = {
    appName:"Asset Chain Starter Kit"
}

const walletConnectOptions: WalletConnectParameters = {
    projectId
}

export const coinbaseConfig = coinbaseWallet(coinBaseOptions);
export const metaMaskConfig = metaMask(metamaskOptions);
export const walletConnectConfig = walletConnect(walletConnectOptions);

export const wagmiConfig = createConfig({
  chains: [ AssetChainMainnet, mainnet, sepolia ],
  connectors: [ coinbaseConfig, metaMaskConfig, walletConnectConfig ],
  transports: {
    [AssetChainMainnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})