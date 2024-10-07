"use client";
import React, { createContext, useState } from "react";
import Dashboard from "./Dashboard";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import AppKit from "@/context/magmiProvider";
export const DashboardContext = createContext<DashboardContextType>({
  tonConnected: false,
  setTonConnected: () => {},
  evmConnected: false,
  setEvmConnected: () => {},
  selectedWallet: {},
  setSelectedWallet: () => {},
  disableTon: false,
  setDisableTon: () => {},
  disbleEvm: false,
  setDisableEvm: () => {},
});

function AppPage() {
  const [tonConnected, setTonConnected] = useState(false);
  const [evmConnected, setEvmConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Network>();
  const [disableTon, setDisableTon] = useState(false);
  const [disbleEvm, setDisableEvm] = useState(false);

  return (
    <div>
      <AppKit>
        <TonConnectUIProvider manifestUrl="https://api-staging.clanofraiders.com/tonconnect-manifest.json">
          <DashboardContext.Provider
            value={{
              tonConnected,
              setTonConnected,
              evmConnected,
              setEvmConnected,
              selectedWallet,
              setSelectedWallet,
              disableTon,
              setDisableTon,
              disbleEvm,
              setDisableEvm,
            }}
          >
            <Dashboard />
          </DashboardContext.Provider>
        </TonConnectUIProvider>
      </AppKit>
    </div>
  );
}

export default AppPage;
