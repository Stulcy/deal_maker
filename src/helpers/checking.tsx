export const checkAddress = (address: string): boolean => {
  return address.length === 42 && address.slice(0, 2) === "0x" ? true : false;
};
