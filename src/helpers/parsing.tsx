export const parseAddress = (address: string) => {
  const firstPart = address.substring(0, 5);
  const secondPart = address.substring(address.length - 4, address.length);
  return firstPart + "..." + secondPart;
};
