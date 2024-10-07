import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "@/pages/App";
import { NETWORKS } from '@/configs/networks';
import { getAccount, connect, disconnect, sendTransaction, getConnections, reconnect } from '@wagmi/core'
import { parseEther, parseGwei } from 'viem'
import { wagmiConfig as config } from '../configs/wagmiConfig'
import { metaMask, injected, MetaMaskParameters } from "@wagmi/connectors";
import { INFURA_KEY } from "@/configs";
import { mainnet } from "viem/chains";
const metamaskOptions: MetaMaskParameters = {
  dappMetadata: {
      name:"Asset Chain Starter kit"
  },
  enableAnalytics: false,
  infuraAPIKey: INFURA_KEY,
  useDeeplink: true
}


export const useEvmWallet = () => {
  const { address, chain, chainId, connector, isConnecting, status, isConnected } = getAccount(config);
  const dashboardContext = useContext(DashboardContext);
  const connections = getConnections(config);
  if (!dashboardContext) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  const { evmConnected, setEvmConnected, setSelectedWallet, selectedWallet } = dashboardContext;

  useEffect(() => {
    console.log({ evmState: status, address, connector, isConnecting, isConnected });
    if(status == "connected"){
      setEvmConnected(true);
      selectWallet("assetchain");
    }
    if(status == "disconnected"){
      setEvmConnected(false);
      selectWallet("no_wallet");
    }

    if(isConnected){
      setEvmConnected(true);
      selectWallet("assetchain");
    }
  }, [status, isConnected]);


  const selectWallet = (wallet_: string) => {
    const wallet = wallet_.toLocaleLowerCase();
    if(wallet == "assetchain"){
      setSelectedWallet(NETWORKS.assetchain_mainnet);
    }
    if(wallet == "ton") {
      setSelectedWallet(NETWORKS.ton_mainnet);
    }
    if(wallet == "no_wallet") {
      setSelectedWallet();
    }
  }

  const connectEvmWallet = async () => {
    try {
     if(!isConnected) {
      console.log("Connect EVM wallet");
      const result = await connect(config, { connector: metaMask(metamaskOptions) });
      if(result){
        console.log({ result });
        setEvmConnected(true);
        selectWallet("assetchain");
      } 
     } else {
      console.log("Wallet connected");
      selectWallet("assetchain");
     }
    } catch (error: any) {
      console.log({ error });
    }
  };

  const disconnectEvmWallet = async () => {
    try {
      await disconnect(config);
      setEvmConnected(false);
    } catch (error: any) {
      console.log({ error });
    }
  };

  const sendTransactionEvm = async (txParams: any) => {
    try {
       // chainId: mainnet.id,
      // connector: connections[0]?.connector,
      if(evmConnected && selectedWallet){
        const result = await sendTransaction(config,{
          to: txParams.to,
          gas: parseGwei("20"),
          value: parseEther(txParams.value),
        });
        if(result) {
          console.log({ sendTransactionEvm: result });
        }
        return result;
      }
    } catch (error: any) {
      console.error({ error });
    }
  };

  const allowReconnect = async () => {
    try {
      const result = await reconnect(config, { connectors: [ metaMask(metamaskOptions) ] });
      if(result){
        console.log({ allowReconnect: result });
      }
    } catch (error: any) {
      console.log({ allowReconnectError: error });
    }
  }

  useEffect(() => {
    if(!isConnected) {
      allowReconnect();
    }
  },[isConnected]);

  return {
    connectEvmWallet,
    disconnectEvmWallet,
    sendTransactionEvm,
    evmAddress: address,
    isConnected,
    isConnecting
  };
};
