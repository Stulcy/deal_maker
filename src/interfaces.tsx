import { JsonRpcSigner } from "ethers";

interface DealData {
  address: string;
  token0: string;
  token0Name: string;
  token1: string;
  token1Name: string;
  user0: string;
  user1: string;
  amount0: string;
  amount1: string;
  didUser0Allow: boolean;
  didUser1Allow: boolean;
}

interface Web3Object {
  signer: JsonRpcSigner | undefined;
  account: string;
  network: string;
  error: string;
}

export type { DealData, Web3Object };
