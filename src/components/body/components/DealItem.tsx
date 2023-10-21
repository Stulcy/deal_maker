import React, { ReactNode, useContext } from "react";
import { DealData } from "../../../interfaces";
import { Web3Context } from "../../../App";

const DealItemWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-[120px] w-full">
      <div className="bg-mainLight h-[2px] w-[20%] self-end" />
      <div className="flex flex-1">
        <div className="bg-mainLight w-[2px] h-[40%] self-end" />
        <div className="flex flex-1 items-center p-1.5 bg-[#2a2a2a]">
          {children}
        </div>
        <div className="bg-mainLight w-[2px] h-[40%]" />
      </div>
      <div className="bg-mainLight h-[2px] w-[20%]" />
    </div>
  );
};

const DealItemActionButton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-[60%] h-[30px] bg-[#5c5c5c]">
      <div className="flex-1 flex">
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
        <div className="bg-mainLight w-[2px] h-[40%] self-end" />
      </div>
      <div className="bg-mainLight h-[2px] w-[70%] self-end" />
    </div>
  );
};

const DealItem = ({ dealData }: { dealData: DealData }) => {
  const web3Context = useContext(Web3Context);
  const isUser0 = web3Context.account === dealData.user0;

  function getButtonTitle(): string {
    if (dealData.didUser0Allow && dealData.didUser1Allow) {
      return "Execute deal";
    } else if (
      (isUser0 && dealData.didUser0Allow) ||
      (!isUser0 && dealData.didUser1Allow)
    ) {
      return "Partner allowance missing";
    }
    // if (
    //   (isUser0 && dealData.didUser1Allow) ||
    //   (!isUser0 && dealData.didUser0Allow)
    // )
    else {
      return "Allow";
    }
  }

  return (
    <div className="flex flex-col items-center h-fit w-full">
      <DealItemWrapper>
        <div className="flex-1 flex flex-col items-center">
          <h1>You</h1>
          <h1 className="text-[24px]">
            {isUser0 ? dealData.amount0 : dealData.amount1}
          </h1>
          <h1>{isUser0 ? dealData.token0Name : dealData.token1Name}</h1>
        </div>
        <div className="bg-mainLight w-[0.5px] h-[80%] self-center"></div>
        <div className="flex-1 flex flex-col items-center">
          <h1>Partner</h1>
          <h1 className="text-[24px]">
            {isUser0 ? dealData.amount1 : dealData.amount0}
          </h1>
          <h1>{isUser0 ? dealData.token1Name : dealData.token0Name}</h1>
        </div>
      </DealItemWrapper>
      <DealItemActionButton>{getButtonTitle()}</DealItemActionButton>
    </div>
  );
};

export default DealItem;
