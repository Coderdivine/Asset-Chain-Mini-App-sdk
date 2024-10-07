type AddressType = "hex" | "base64" | "invalid";

interface AddressResult {
  address: string;
  type: AddressType;
}

function verifyAddress(address: string): AddressResult {
  const hexRegex = /^0x[a-fA-F0-9]{40}$/;
  const base64Regex = /^[A-Za-z0-9+/=]{44}$/;

  if (hexRegex.test(address)) {
    return { address, type: "hex" };
  } else if (base64Regex.test(address)) {
    return { address, type: "base64" };
  } else {
    return { address, type: "invalid" };
  }
}