import { useContext } from 'react';
import { useEvmWallet } from "./useEvmWallet";
import { useTonWallet } from "./useTonWallet";
import { DashboardContext } from '@/pages/App';
const useAssetChainConnect = () => {
    const context = useContext(DashboardContext);
    if (!context) {
      throw new Error('useAssetChainConnect must be used within AssetChainKit');
    }
    return context;
};
  

export {
    useEvmWallet,
    useTonWallet,
    useAssetChainConnect
}