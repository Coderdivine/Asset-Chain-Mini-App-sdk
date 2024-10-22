import { AssetChainMainnet, AssetChainTestnet } from "./chains";
import { NETWORKS } from "./networks";
export const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY || '';
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || '';
export const MANIFEST_URL = process.env.NEXT_PUBLIC_MANIFEST_URL || '';

export const configs = {
    INFURA_KEY,
    PROJECT_ID,
    MANIFEST_URL,
    NETWORKS,
    AssetChainMainnet: AssetChainMainnet,
    AssetChainTestnet: AssetChainTestnet
}