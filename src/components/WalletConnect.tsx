import React, { useContext, useState } from "react";
import { useTonWallet } from "../hooks/useTonWallet";
import { DashboardContext } from "@/pages/App";
import { useEvmWallet } from "@/hooks/useEvmWallet";
import { concatAddress } from "@/utils/concatAddress";

const ConnectButton = ({ toggleModal }: ConnectButton) => {
  const { connectWallet, disconnectWallet, userFriendlyAddress } =
    useTonWallet();
  const { connectEvmWallet, evmAddress, isConnecting } = useEvmWallet();
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  const { tonConnected, evmConnected, disbleEvm, disableTon } =
    dashboardContext;
  const address = concatAddress(userFriendlyAddress);
  const addressEVM = concatAddress(evmAddress || "");

  return (
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
          {!disbleEvm && <div>
            <button
            disabled={disbleEvm}
            onClick={connectEvmWallet}
            className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
          >
            <img
              src="https://pbs.twimg.com/profile_images/1805286722768343041/IeuGAwF3_400x400.jpg"
              alt="AssetChain"
              className="w-8 h-8 mr-4 rounded-full"
            />
            {!evmConnected ? (
              <span className="font-bold">{ "AssetChain" }</span>
            ) : (
              <span className="font-bold">{evmAddress && addressEVM}</span>
            )}
          </button></div>}

          { !disableTon &&  <div>
            {!tonConnected ? (
            <div>
              <button
                disabled={disableTon}
                onClick={connectWallet}
                className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
              >
                <img
                  src="https://pbs.twimg.com/profile_images/1833486393823096832/N39rUf-e_400x400.png"
                  alt="TON"
                  className="w-8 h-8 mr-4 rounded-full"
                />
                <span className="font-bold">TON</span>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={disconnectWallet}
                className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
              >
                <img
                  src="https://pbs.twimg.com/profile_images/1833486393823096832/N39rUf-e_400x400.png"
                  alt="TON"
                  className="w-8 h-8 mr-4 rounded-full"
                />
                <span className="font-bold">{address || ""}</span>
              </button>
            </div>
          )}
          </div> }
        </div>
      </div>
    </div>
  );
};

export default ConnectButton;
