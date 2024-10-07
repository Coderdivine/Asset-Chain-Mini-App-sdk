"use client"
import React from 'react'

function AssetList({ toggleSendModal, walletAssets, showBalance }: Asset) {
  return (
    <div>
        <div className="p-6 bg-gray-100 rounded">
          <h2 className="text-lg font-bold mb-4">Collected Wallet Assets</h2>
          {walletAssets && walletAssets?.map((asset: any) => (
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
                    {showBalance ? asset.balance : ""} {asset.symbol}
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
    </div>
  )
}

export default AssetList