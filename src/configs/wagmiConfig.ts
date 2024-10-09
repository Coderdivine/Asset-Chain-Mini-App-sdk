import { http, createConfig, injected } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { coinbaseWallet, metaMask, walletConnect, MetaMaskParameters, CoinbaseWalletParameters, WalletConnectParameters } from '@wagmi/connectors'
import { INFURA_KEY, PROJECT_ID } from '.';
import { AssetChainMainnet } from './chains';
const projectId = PROJECT_ID;
const infuraAPIKey = INFURA_KEY;
const metadata = {
    name: "Starter kit",
    description: "Asset Chain mini app starter kit",
    url: "https://walletconnect.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"]
  };

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
    projectId,
    metadata,
    isNewChainsStale: true,
    disableProviderPing: false, 
    customStoragePrefix: 'wagmi',
    qrModalOptions: { 
        themeMode: 'dark', 
    }, 
}

export const coinbaseConfig = coinbaseWallet(coinBaseOptions);
export const metaMaskConfig = metaMask(metamaskOptions);
export const walletConnectConfig = walletConnect(walletConnectOptions);

export const wagmiConfig = createConfig({
  chains: [ AssetChainMainnet ],
  connectors: [ coinbaseConfig, metaMaskConfig, walletConnectConfig ],
  ssr: true,
  transports: {
    [AssetChainMainnet.id]: http()
  },
})