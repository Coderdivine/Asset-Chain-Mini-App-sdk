import { concatAddress } from "./concatAddress";

export function explorerLink(network: Network, hash: string) {
    const rawLink = network.explorerUrl.concat("/tx/").concat(hash);
    const turncateLink = concatAddress(network.explorerUrl).concat("/tx/").concat(concatAddress(hash));
    return {
        rawLink,
        turncateLink
    }
}