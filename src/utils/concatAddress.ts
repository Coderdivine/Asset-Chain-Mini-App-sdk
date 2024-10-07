export const concatAddress = (address: string) => {
    return address.length ? address.substring(0,4).concat("...").concat(address.substring(address.length - 4 ,address.length)) : "";
}