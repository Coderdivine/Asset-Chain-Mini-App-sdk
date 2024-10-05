"use client";
import { useState } from "react";

function Dashboard() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState<boolean>(false);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<string>("");
  const [gasEstimate, setGasEstimate] = useState<string>("0.013 TON");
  const [pending, setPending] = useState<boolean>(false);

  const walletAssets: WalletAsset[] = [
    {
      id: 1,
      image: "https://etherscan.io/token/images/rwa_32.png",
      balance: "10",
      symbol: "ETH",
    },
    {
      id: 2,
      image: "https://etherscan.io/token/images/tethernew_32.png",
      balance: "25",
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
    { id: 1, amount: "0.5 ETH", date: "2024-10-05", txHash: "0x123...0xfe" },
    { id: 2, amount: "15 USDC", date: "2024-10-03", txHash: "0x456...0Bfe" },
  ];

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleSendModal = () => setIsSendModalOpen(!isSendModalOpen);

  const handleSendTransaction = () => {
    console.log(`Sending ${sendAmount} to ${recipientAddress}`);
    // toggleSendModal();
    setPending(!pending);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4">
      <header className="flex justify-between items-center mb-8">
        <div className="font-bold text-2xl">Asset Chain</div>
        <button
          onClick={toggleModal}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          {isConnected ? "Connected" : "Connect"}
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white p-6 w-full md:w-1/2 rounded-t-lg">
            <span className="flex justify-between">
              <h2 className="text-lg font-bold mb-4">Choose Wallet</h2>
              <h2
                onClick={toggleModal}
                className="text-lg font-bold mb-4 text-gray-500 cursor-pointer"
              >
                X
              </h2>
            </span>
            <div className="flex justify-around">
              {/* First Button (AssetChain) */}
              <button className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200">
                <img
                  src="https://pbs.twimg.com/profile_images/1805286722768343041/IeuGAwF3_400x400.jpg"
                  alt="AssetChain"
                  className="w-8 h-8 mr-4 rounded-full"
                />
                <span className="font-bold">AssetChain</span>
              </button>

              {/* Second Button (TON) */}
              <button className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200">
                <img
                  src="https://pbs.twimg.com/profile_images/1833486393823096832/N39rUf-e_400x400.png"
                  alt="TON"
                  className="w-8 h-8 mr-4 rounded-full"
                />
                <span className="font-bold">TON</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
                Estimated Gas Fee: <strong>{gasEstimate}</strong>
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
        </div>

        <div className="p-6 bg-gray-100 rounded">
          <h2 className="text-lg font-bold mb-4">Collected Wallet Assets</h2>
          {walletAssets.map((asset) => (
            <div
              key={asset.id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <img
                  src={asset.image}
                  alt={asset.symbol}
                  className="w-8 h-8 mr-4 rounded-full"
                />
                <div>
                  <p>
                    {asset.balance} {asset.symbol}
                  </p>
                </div>
              </div>
              <div>
                <button
                  className="bg-gray-800 text-white px-4 py-2 rounded"
                  onClick={toggleSendModal}
                >
                  Send Transaction
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="p-6 bg-gray-100 rounded">
          <h2 className="text-lg font-bold mb-4">Latest Transactions</h2>
          {transactionHistory.map((tx) => (
            <div key={tx.id} className="mb-4">
              <p>
                <strong>Amount:</strong> {tx.amount}
              </p>
              <p>
                <strong>Date:</strong> {tx.date}
              </p>
              <p className="flex">
                <strong>Hash: </strong> {tx.txHash}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4 mr-1 mt-1 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </span>
              </p>
              <hr className="border mt-2" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
