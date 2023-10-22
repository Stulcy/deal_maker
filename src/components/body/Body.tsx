import DealsList from "./DealsList";
import DealMake from "./DealMake";
import WrongNetwork from "./WrongNetwork";
import { useContext } from "react";
import { Web3Context } from "../../App";
import { MUMBAI_ID } from "../../constants";

const Body = ({
  switchChain,
}: {
  switchChain: (chainId: string) => Promise<void>;
}) => {
  const web3Context = useContext(Web3Context);

  return (
    <div className="w-full h-fit flex justify-center">
      <div className="w-[95%] h-fit flex">
        {web3Context.network === MUMBAI_ID ? (
          <>
            <DealsList />
            <DealMake />
          </>
        ) : (
          <WrongNetwork switchChain={switchChain} />
        )}
      </div>
    </div>
  );
};

export default Body;
