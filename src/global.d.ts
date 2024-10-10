interface WalletAsset {
  id: number;
  image: string;
  balance: string;
  symbol: string;
}

interface Transaction {
  id: number;
  amount: string;
  date: string;
  txHash: string;
}

interface Asset {
  walletAssets: WalletAsset[];
  toggleSendModal: any;
  showBalance: boolean;
}

interface TransactionHistory {
  transactionHistory: Transaction[];
}

interface ConnectButton {
  toggleModal: () => void;
}

interface DashboardContextType {
  tonConnected: boolean;
  setTonConnected: (value: boolean) => void;
  evmConnected: boolean;
  setEvmConnected: (value: boolean) => void;
  selectedWallet: any;
  setSelectedWallet: any;
  disableTon: boolean;
  setDisableTon: (value: boolean) => void;
  disbleEvm: boolean;
  setDisableEvm: (value: boolean) => void;
  processing: boolean;
  setProcessing: (value: boolean) => void;
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  walletConnected: boolean;
  setWalletConnected: (value: boolean) => void;
  handleSendTransaction: (amount: string, to: string ) => void;
  allowDisconnect: () => void;
}

interface Network {
  name: string;
  addressType: string;
  chainId: number;
  id: string;
  chainNamespace: string;
  currency: string;
  explorerUrl: string;
  rpcUrl: string;
}

type Networks = {
  [key: string]: Network | Partial<Network>;
}

interface EVM {
  projectId: string, 
  infuraApiKey: string, 
  metadata: any; 
  defaultConnector: any | undefined;
}

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
