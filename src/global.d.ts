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