"use client";
import React, { createContext, useState } from "react";
import Dashboard from "./Dashboard";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import AppKit from "@/context/magmiProvider";
import { MANIFEST_URL } from "@/configs";
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
const manifestUrl = MANIFEST_URL;

function AppPage() {
  const [tonConnected, setTonConnected] = useState(false);
  const [evmConnected, setEvmConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Network>();
  const [disableTon, setDisableTon] = useState(false);
  const [disbleEvm, setDisableEvm] = useState(false);

  return (
    <div>
      <AppKit>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
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
