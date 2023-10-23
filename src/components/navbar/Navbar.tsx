import { useContext } from "react";
import { Web3Context } from "../../App";
import { parseAddress } from "../../helpers/parsing";
import { MUMBAI_ID } from "../../constants";

const Navbar = ({
  switchChain,
  connect,
}: {
  switchChain: (chainId: string) => Promise<void>;
  connect: () => Promise<void>;
}) => {
  const web3Context = useContext(Web3Context);

  const getOnClick = () => {
    if (web3Context.error === "install") {
      return window.open("https://rabby.io/", "_blank", "noreferrer");
    } else if (web3Context.error === "login") {
      return connect();
    } else if (web3Context.network !== MUMBAI_ID) {
      return switchChain(MUMBAI_ID);
    } else {
      return () => {};
    }
  };

  const getNetworkText = () => {
    if (web3Context.error === "install") {
      return "Download Rabby";
    } else if (web3Context.error === "login") {
      return "Login into Rabby";
    } else if (web3Context.network !== MUMBAI_ID) {
      return "Switch to Mumbai";
    } else {
      return "Connected to Mumbai";
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-[80px]">
      <div className="flex justify-between items-center flex-1 w-[92%]">
        <h1 className="font-mainFont text-[20px] md:text-[26px]">
          Stulcy's DealMaker
        </h1>
        <div className="flex flex-col items-end">
          <h1
            className={`text-right ${
              (web3Context.error || web3Context.network !== MUMBAI_ID) &&
              "cursor-pointer hover:text-mainBlue"
            }`}
            onClick={() => getOnClick()}
          >
            {getNetworkText()}
          </h1>
          {web3Context.account && <h1>{parseAddress(web3Context.account)}</h1>}
        </div>
      </div>
      <div className="bg-mainLight w-[95%] h-[1px]"></div>
    </div>
  );
};

export default Navbar;
