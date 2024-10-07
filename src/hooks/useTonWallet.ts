import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "@/pages/App";
import { NETWORKS } from "@/configs/networks";
import TonWeb from "tonweb";
const tonWeb = new TonWeb();

export const useTonWallet = () => {
  const { state, open, close, } = useTonConnectModal();
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  const { tonConnected, setTonConnected, setSelectedWallet } = dashboardContext;

  const selectWallet = (wallet_: string) => {
    const wallet = wallet_.toLocaleLowerCase();
    console.log({ wallet })
    if(wallet == "assetchain"){
      setSelectedWallet(NETWORKS.assetchain_mainnet);
    }
    if(wallet == "ton") {
      setSelectedWallet(NETWORKS.ton_mainnet);
    }
  }

  useEffect(() => {
    console.log({ state });
    if(state.closeReason == "action-cancelled") {
        setTonConnected(false);
    }
    if(state.closeReason == "wallet-selected") {
        setTonConnected(true);
        selectWallet("ton");
    }
    if(state.closeReason == null && userFriendlyAddress.length) {
        setTonConnected(true);
    }
    if(state.closeReason == "action-cancelled" && !userFriendlyAddress.length) {
        setTonConnected(false);
    }
  }, [state]);

  const connectWallet = async () => {
    try {
      selectWallet("ton");
      
      await open();
      console.log({ userFriendlyAddress, rawAddress });
    } catch (error: any) {
      console.log({ error });
    }
  };

  const disconnectWallet = async () => {
    try {
    if(userFriendlyAddress.length){
        await tonConnectUI.disconnect();
        await close();
        setTonConnected(false);
        setTonConnected(false);
        setSelectedWallet();
    } else {
        console.log({ message: "Connect wallet first" });
        setTonConnected(false);
    }
    } catch (error: any) {
      console.log({ error });
    }
  };

  const sendTransaction = async (txParams: any) => {
    try {
      txParams.from = userFriendlyAddress;
      const value = tonWeb.utils.toNano(txParams.value);
      console.log({ value });
      const tx = await tonConnectUI.sendTransaction({
        validUntil: Date.now() + 1000000,
        messages: [
          {
            address: txParams.to,
            amount: value.toString(),
          },
        ],
      });
      return tx;
    } catch (error: any) {
      console.error("Transaction failed" + error.message);
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    sendTransaction,
    userFriendlyAddress,
    tonConnected,
    state
  };
};
