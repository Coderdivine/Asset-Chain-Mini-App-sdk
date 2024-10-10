# Asset Chain Telegram Mini App Starter Kit

<<<<<<< HEAD
This starter kit provides a foundational setup for building a Telegram mini app integrated with blockchain wallets like MetaMask, Coinbase Wallet, and WalletConnect. It uses Next.js, wagmi for Asset Chain wallet connections, and various injected providers for ease of use.
=======
This starter kit provides a foundational setup for building a Telegram mini app integrated with blockchain wallets like MetaMask, Coinbase Wallet, and WalletConnect. It uses Next.js, wagmi for 
Asset Chain wallet connections, and various injected providers for ease of use.
>>>>>>> 306655a6e3596a82139194febf34f442660a83a7

## Requirements

1. **Environment Variables**:  
   - Rename `.env.example` to `.env.local` and configure the following parameters:
     - `NEXT_PUBLIC_PROJECT_ID=""`: Add your project ID from [Reown](https://cloud.reown.com).
     - `NEXT_PUBLIC_INFURA_KEY=""`: Add your Infura API key from [Infura](https://www.infura.io).
     - `NEXT_PUBLIC_MANIFEST_URL=""`: Add a manifest URL.  
       Example: `"https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"`.

2. **Clone the Repository**:  
   ```bash
   cd <cloned-repo>
   ```

3. **Install Dependencies**:  
   Run the following command to install the necessary packages:
   ```bash
   npm install
   ```

4. **Start the Development Server**:  
   Run the server locally:
   ```bash
   npm run dev
   ```

## Connecting to Injected Providers

To connect the app with different Ethereum wallet providers, you can modify the default connector in your `src/hooks/useEvmWallet.tsx` file based on your needs.

### Injected Providers Setup

1. **Use Injected Provider**:  
   This sets the default connector to detect and use any wallet injected into the browser, such as MetaMask or Coinbase Wallet.
   ```ts
   import { injected } from "@wagmi/core";
   const defaultConnector = injected();
   ```

2. **Use Coinbase Provider**:  
   To connect with Coinbase Wallet, change the configuration:
   ```ts
   import { coinbaseConfig } from "../configs/wagmiConfig";
   const defaultConnector = coinbaseConfig;
   ```

3. **Use MetaMask Provider**:  
   If you prefer MetaMask as your default wallet provider, configure it like so:
   ```ts
   import { metaMaskConfig } from "../configs/wagmiConfig";
   const defaultConnector = metaMaskConfig;
   ```

4. **Use WalletConnect Provider**:  
   To integrate WalletConnect, which supports mobile wallets, adjust the default connector to:
   ```ts
   import { walletConnectConfig } from "../configs/wagmiConfig";
   const defaultConnector = walletConnectConfig;
   ```

---

With this setup, you'll be able to connect your Telegram mini app to various Ethereum wallets, giving your users flexibility in interacting with blockchain-enabled features.