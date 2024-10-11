# Asset Chain Telegram App Starter Kit

This starter kit provides a foundational setup for building a Telegram mini app integrated with blockchain wallets like MetaMask, Coinbase Wallet, and WalletConnect. It uses Next.js, wagmi for 
Asset Chain wallet connections, and various injected providers for ease of use.

## Table of content
- [Getting Started](https://github.com/xendfinance/assetchain-telegram-app-starter-kit#getting-started)
- [Contributing](https://github.com/xendfinance/assetchain-telegram-app-starter-kit#contributing)
- [License](https://github.com/xendfinance/assetchain-telegram-app-starter-kit#license)
- [Support](https://github.com/xendfinance/assetchain-telegram-app-starter-kit#support)

## Contributing

See [CONTRIBUTING.md](https://github.com/xendfinance/assetchain-telegram-app-starter-kit/CONTRIBUTING.md) for contribution and pull request protocol. We expect contributors to follow our guide when submitting code or comments.

## License

[![License: GPL v3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or suggestions, just say Hi on [Telegram](https://t.me/assetchainbuilders).<br/>
We're always glad to help.

## Get Started

### 1. **Imports and Initial Setup**

```tsx
"use client";
import React, { useState } from "react";
import { INFURA_KEY, PROJECT_ID } from "@/configs";
import {
  AssetChainKit,
  concatAddress,
  onCopy,
  useAssetChainConnect,
  useEvmWallet,
  useTonWallet,
} from "assetchain-connect-test";
```

#### Explanation:
- **`"use client";`**: Marks this component to be client-side, meaning it will run in the browser rather than on the server.
- **React and Hooks**: We're using `useState` for managing local state in the React component.
- **Configs**: `INFURA_KEY` and `PROJECT_ID` are imported from a configuration file (`@/configs`), used for connecting to blockchain networks.
 - `PROJECT_ID`: Add your project ID from [Reown](https://cloud.reown.com).
 - `INFURA_KEY`: Add your Infura API key from [Infura](https://www.infura.io).
- **Imports from `assetchain-connect-test`**: 
  - `AssetChainKit`: A wrapper component that facilitates blockchain wallet connections.
  - `concatAddress`: A utility function to shorten wallet addresses.
  - `onCopy`: A utility function to copy addresses to the clipboard.
  - `useEvmWallet` and `useTonWallet`: Hooks to handle EVM and TON wallet interactions.

---

### 2. **Setting Up the ConnectButton Component**

```tsx
function ConnectButton() {
  const evmWallet = {
    projectId: PROJECT_ID,
    infuraApiKey: INFURA_KEY,
    metadata: { name: "Asset Chain test" },
  };
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
```

#### Explanation:
- **`ConnectButton` component**: This component handles the logic for connecting to wallets and sending transactions.
- **`evmWallet` configuration**: This object contains the settings for connecting to an EVM-compatible wallet:
  - `projectId`: The project ID (Reown).
  - `infuraApiKey`: The API key for Infura to interact with the Ethereum blockchain.
  - `metadata`: Contains information like the name of the app.
- **State variables**:
  - `address`: Stores the recipient address for transactions.
  - `amount`: Stores the amount for transactions.

---

### 3. **Using Wallet Hooks**

```tsx
  const {
    connectEvmWallet,
    evmAddress,
    disconnectEvmWallet,
    sendTransactionEvm,
  } = useEvmWallet(evmWallet);

  const {
    connectWallet,
    userFriendlyAddress,
    disconnectWallet,
    sendTransaction,
  } = useTonWallet();
```

#### Explanation:
- **`useEvmWallet(evmWallet)`**:
  - `connectEvmWallet`: Function to connect an EVM wallet (e.g., MetaMask).
  - `evmAddress`: Stores the currently connected EVM wallet address.
  - `disconnectEvmWallet`: Function to disconnect the EVM wallet.
  - `sendTransactionEvm`: Function to send transactions on EVM networks.
  
- **`useTonWallet()`**:
  - `connectWallet`: Function to connect a TON wallet.
  - `userFriendlyAddress`: The connected TON wallet address in a human-readable format.
  - `disconnectWallet`: Function to disconnect the TON wallet.
  - `sendTransaction`: Function to send transactions on the TON network.

---

### 4. **Transaction Functions**

```tsx
  const sendTonTransaction = async () => {
    try {
      const result = await sendTransaction({ to: address, value: amount });
      console.log({ sendTonTransaction: result });
    } catch (error) {
      console.log({ sendTonTransactionError: error });
    }
  };

  const sendAssetChainTransaction = async () => {
    try {
      const result = await sendTransactionEvm({ to: address, value: amount });
      console.log({ sendTonTransaction: result });
    } catch (error) {
      console.log({ sendTonTransactionError: error });
    }
  };
```

#### Explanation:
- **`sendTonTransaction`**:
  - Asynchronous function to send a transaction using the TON network.
  - Takes the `address` and `amount` values from the component's state and uses `sendTransaction` to send a TON transaction.
  - Logs the result or catches and logs any errors.

- **`sendAssetChainTransaction`**:
  - Asynchronous function to send a transaction using the EVM network.
  - Uses `sendTransactionEvm` to send a transaction to the `address` with the specified `amount` on the EVM blockchain.
  - Also logs the result or errors.

---

### 5. **Rendering Wallet Connection Buttons**

```tsx
  return (
    <div className="m-2">
      <AssetChainKit
        metadata={{ name: "Asset Chain test" }}
        infuraApiKey={INFURA_KEY}
        projectId={PROJECT_ID}
        defaultConnector={undefined}
      >
        <div className="flex justify-between mb-4">
          {userFriendlyAddress ? (
            <button
              onClick={disconnectWallet}
              className="px-7 py-2 mb-4 border rounded-md mx-2"
            >
              Disconnect TON
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="flex px-7 py-2 mb-4 border rounded-md mx-2"
            >
              Connect TON wallet
            </button>
          )}
```

#### Explanation:
- **`AssetChainKit`**:
  - Wraps the component to handle wallet connections. It is configured with metadata, the Infura API key, and the project ID.
  
- **TON Wallet Connection**:
  - Renders a button to either connect or disconnect the TON wallet.
  - If `userFriendlyAddress` (the connected wallet address) exists, it shows a "Disconnect" button. Otherwise, it shows a "Connect TON wallet" button.

---

### 6. **Rendering EVM Wallet Connection**

```tsx
          {evmAddress ? (
            <button
              onClick={disconnectEvmWallet}
              className="px-8 py-3 border rounded-md"
            >
              Disconnect Asset Chain
            </button>
          ) : (
            <button
              onClick={connectEvmWallet}
              className="px-8 py-3 border rounded-md"
            >
              Connect Asset Chain
            </button>
          )}
        </div>
```

#### Explanation:
- **EVM Wallet Connection**:
  - If `evmAddress` (the connected EVM wallet address) exists, it shows a "Disconnect Asset Chain" button.
  - If no EVM wallet is connected, it shows a "Connect Asset Chain" button.

---

### 7. **Displaying Wallet Addresses**

```tsx
        <div className="text-center grid">
          {evmAddress && (
            <p onClick={() => onCopy(evmAddress)}>
              <span>Asset Chain:</span> {concatAddress(evmAddress)}{" "}
            </p>
          )}
          {userFriendlyAddress && (
            <p onClick={() => onCopy(userFriendlyAddress)}>
              <span>Asset TON:</span> {concatAddress(userFriendlyAddress)}{" "}
            </p>
          )}
        </div>
```

#### Explanation:
- **Displaying Wallet Addresses**:
  - If an EVM address (`evmAddress`) exists, it displays a shortened version using `concatAddress`. The address can also be copied using the `onCopy` utility.
  - Similarly, if a TON address exists (`userFriendlyAddress`), it displays the shortened address and supports copying.

---

### 8. **Transaction Form for TON Wallet**

```tsx
        {userFriendlyAddress && (
          <div className="m-2 p-4 border rounded-lg w-auto mt-8 justify-center text-center">
            <h1 className="text-center mb-4 mt-4">Send Transaction (TON) </h1>
            <div className="">
              <input
                className="bg-transparent border rounded-md py-2 px-10 mb-4 text-white"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <input
                className="bg-transparent border rounded-md py-2 px-10 text-white"
                placeholder="amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
              <button
                onClick={sendTonTransaction}
                className="bg-transparent border rounded-md py-2 px-10 mt-4 text-white"
              >
                Send
              </button>
            </div>
          </div>
        )}
```

#### Explanation:
- **TON Transaction Form**:
  - If a TON wallet is connected, a form is displayed for the user to input the recipient's address and the amount to send.
  - When the form is submitted, it triggers the `sendTonTransaction` function.

---

### 9. **Transaction Form for EVM Wallet**

```tsx
        {evmAddress && (
          <div className="m-2 p-4 border rounded-lg w-auto mt-8 justify-center text-center">
            <h1 className="text-center mb-4 mt-4">Send Transaction (Asset Chain) </h1>
            <div className="">
              <input
                className="bg-transparent border rounded-md py-2 px-10 mb-4 text-white"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value

)}
                value={address}
              />
              <input
                className="bg-transparent border rounded-md py-2 px-10 text-white"
                placeholder="amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
              <button
                onClick={sendAssetChainTransaction}
                className="bg-transparent border rounded-md py-2 px-10 mt-4 text-white"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </AssetChainKit>
    </div>
  );
}
```

#### Explanation:
- **EVM Transaction Form**:
  - If an EVM wallet is connected, this form allows the user to input the recipient address and amount for a transaction.
  - The `sendAssetChainTransaction` function is called when the "Send" button is pressed.

---

### 10. **Exporting the Component**

```tsx
export default ConnectButton;
```

#### Explanation:
- The `ConnectButton` component is exported so it can be used in other parts of the application.

---

### Summary of the Component

- The component provides buttons to connect or disconnect from TON and EVM-compatible wallets.
- It also displays the connected wallet addresses, with options to copy them.
- Forms are provided for sending transactions to the connected networks (TON and EVM).
- Utility functions (`onCopy`, `concatAddress`) and hooks (`useEvmWallet`, `useTonWallet`) are leveraged to handle blockchain-related actions efficiently.
