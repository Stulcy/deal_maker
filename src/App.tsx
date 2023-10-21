import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import React from "react";
import { JsonRpcSigner, ethers } from "ethers";
import Body from "./components/body/Body";
import { Web3Object } from "./interfaces";

export const Web3Context = React.createContext<Web3Object>({
  signer: undefined,
  account: "",
  network: "",
  error: "",
});

function App() {
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  const [account, setAccount] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [error, setError] = useState<string>("");

  const connect = useCallback(async () => {
    const ethereum = (window as any).ethereum;
    if ((window as any).ethereum == null) {
      setError("install");
      return;
    }

    const provider = new ethers.BrowserProvider(ethereum);

    try {
      const signer = await provider.getSigner();
      setSigner(signer);
      setAccount(signer.address);
      setNetwork((await provider.getNetwork()).chainId.toString());
      setError("");
    } catch (_) {
      setError("login");
    }

    ethereum.removeAllListeners();

    ethereum.on("accountsChanged", () => connect());
    ethereum.on("chainChanged", () => connect());
  }, []);

  const switchChain = async (chainId: string) => {
    const ethereum = (window as any).ethereum;
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(chainId) }],
      });
    } catch (_) {}
  };

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <Web3Context.Provider
      value={{
        signer: signer,
        account: account,
        network: network,
        error: error,
      }}
    >
      <>
        <Navbar switchChain={switchChain} connect={connect} />
        <Body />
      </>
    </Web3Context.Provider>
  );
}

export default App;
