import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");

  async function connect() {
    let signer = null;

    let provider;
    if ((window as any).ethereum == null) {
      console.log("No Metamask");
    } else {
      provider = new ethers.BrowserProvider((window as any).ethereum);
      signer = await provider.getSigner();
      setAccount(signer.address);
      setNetwork((await provider.getNetwork()).chainId.toString());
    }
  }

  useEffect(() => {
    connect();
    (window as any).ethereum != null &&
      (window as any).ethereum.on("accountsChanged", () => connect());
    (window as any).ethereum != null &&
      (window as any).ethereum.on("chainChanged", () => connect());
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center w-full h-fit">
        <p>
          {account}
          {"->"}
        </p>
        <p>{network}</p>
      </div>
    </>
  );
}

export default App;
