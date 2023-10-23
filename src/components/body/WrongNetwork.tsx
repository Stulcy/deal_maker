import React from "react";
import { MUMBAI_ID } from "../../constants";

const WrongNetwork = ({
  switchChain,
}: {
  switchChain: (chainId: string) => Promise<void>;
}) => {
  return (
    <div className="flex flex-col flex-1 items-center mt-6 text-center mx-5">
      <h1>DealMaker not supported on this network just yet.</h1>
      <h1
        onClick={() => switchChain(MUMBAI_ID)}
        className="text-[26px] mt-2 hover:text-mainBlue cursor-pointer"
      >
        Switch to Mumbai
      </h1>
    </div>
  );
};

export default WrongNetwork;
