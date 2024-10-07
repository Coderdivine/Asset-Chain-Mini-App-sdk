"use client";
import AssetList from "@/components/AssetList";
import Transactions from "@/components/Transactions";
import ConnectButton from "@/components/WalletConnect";
import { useTonWallet } from "@/hooks/useTonWallet";
import { useState, useEffect, useContext } from "react";
import { DashboardContext } from "./App";
import { concatAddress } from "@/utils/concatAddress";
import { onCopy } from "@/utils/onCopy";

function Dashboard() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState<boolean>(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<string>("");
  const [gasEstimate, setGasEstimate] = useState<string>("0.013 TON");
  const [pending, setPending] = useState<boolean>(false);
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  const {
    tonConnected,
    setTonConnected,
    evmConnected,
    setEvmConnected,
    selectedWallet,
  } = dashboardContext;
  const { disconnectWallet, sendTransaction, userFriendlyAddress } =
    useTonWallet();

  useEffect(() => {
    if (tonConnected || evmConnected) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
    }
  }, [tonConnected, evmConnected, selectedWallet]);

  const allowDisconnect = () => {
    disconnectWallet();
    setWalletConnected(false);
  };

  const walletAssets: WalletAsset[] = [
    {
      id: 1,
      image: "https://pbs.twimg.com/profile_images/1833486393823096832/N39rUf-e_400x400.png",
      balance: "10",
      symbol: "TON",
    }
  ];

  const walletAssetsEVM: WalletAsset[] = [
    {
      id: 1,
      image: "https://etherscan.io/token/images/rwa_32.png",
      balance: "10,000",
      symbol: "RWA",
    },
    {
      id: 2,
      image: "https://etherscan.io/token/images/tethernew_32.png",
      balance: "25,000",
      symbol: "USDT",
    },
    {
      id: 3,
      image:
        "https://cache.tonapi.io/imgproxy/4KCMNm34jZLXt0rqeFm4rH-BK4FoK76EVX9r0cCIGDg/rs:fill:200:200:1/g:no/aHR0cHM6Ly9jZG4uam9pbmNvbW11bml0eS54eXovY2xpY2tlci9ub3RfbG9nby5wbmc.webp",
      balance: "25,000",
      symbol: "NOT",
    },
  ];

  const transactionHistory: Transaction[] = [
    { id: 1, amount: "50.00 RWA", date: "2024-10-05", txHash: "0x123...0xfe" },
    { id: 2, amount: "15 USDC", date: "2024-10-03", txHash: "0x456...0Bfe" },
  ];

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleSendModal = () => setIsSendModalOpen(!isSendModalOpen);

  const handleSendTransaction = async () => {
    try {
      if (selectedWallet) {
        if (tonConnected || evmConnected) {
          if (selectedWallet.currency == "TON") {
            const tx = await sendTransaction({
              value: sendAmount,
              to: recipientAddress,
              payload: "",
            });
            if (tx) {
              console.log({ tx });
            }
          }
          if (selectedWallet.currency == "RWA") {
            console.log("Development");
          }
        }
      } else {
        console.log("Connect a wallet first");
      }
      setPending(false);
    } catch (error) {
       console.log({ error });
    }
  };

  const connectWallet = () => {
    setIsConnected(true);
    toggleModal();
    setGasEstimate("0.14" + "TON");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4">
      <header className="flex justify-between items-center mb-8">
        <div className="font-bold text-2xl">Asset Chain</div>
        {!walletConnected ? (
          <button
            onClick={connectWallet}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            {walletConnected ? "Connected" : "Connect"}
          </button>
        ) : (
          <button
            onClick={allowDisconnect}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Disconnect { selectedWallet && selectedWallet?.currency || ""}
          </button>
        )}
      </header>

      {isModalOpen && <ConnectButton toggleModal={toggleModal} />}

      {isSendModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white p-6 w-full md:w-1/2 rounded-t-lg">
            <span className="flex justify-between">
              <h2 className="text-lg font-bold mb-4">Send Transaction</h2>
              <h2
                onClick={toggleSendModal}
                className="text-lg font-bold mb-4 text-gray-500 p-1 cursor-pointer"
              >
                X
              </h2>
            </span>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter recipient address"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                placeholder="Enter amount"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm">
                {/* Estimated Gas Fee: <strong>{gasEstimate}</strong> */}
              </p>
            </div>
            <button
              onClick={handleSendTransaction}
              className="w-full bg-gray-800 text-center text-white py-2 rounded-lg"
            >
              {!pending ? (
                "Send Transaction"
              ) : (
                <span className="text-center justify-center flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5 animate-spin mt-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-100 rounded">
          <h1 className="text-lg font-bold">AssetChain Starter Kit</h1>
          <p className="text-sm mt-2">
            Wallet asset, make transaction and view history
          </p>
          {userFriendlyAddress && (
            <p className="flex text-sm mt-2">
              Wallet address:
              <span className="flex text-sm ml-1 -mt-1 rounded-md p-1">
                {concatAddress(userFriendlyAddress) || ""}
                <span onClick={() => onCopy(userFriendlyAddress)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4 ml-1 mr-1 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </span>
              </span>
            </p>
          )}
        </div>

        { tonConnected && <AssetList
          walletAssets={walletAssets}
          toggleSendModal={toggleSendModal}
          showBalance={false}
        />}
        { evmConnected && <AssetList
          walletAssets={walletAssets}
          toggleSendModal={toggleSendModal}
          showBalance={false}
        />}
        <Transactions transactionHistory={transactionHistory} />
      </main>
    </div>
  );
}

export default Dashboard;
