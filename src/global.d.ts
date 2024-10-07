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
    showBalance:boolean;
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
    selectedWallet:any, 
    setSelectedWallet: any
  }

interface Network {
  name: string;        
  addressType: string;  
  chainId: number;     
  id:string;
  chainNamespace:string;
  currency: string;    
  explorerUrl: string; 
  rpcUrl: string;      
}

type Networks = {
  [key: string]: Network | Partial<Network>;
};