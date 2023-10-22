import { ReactNode, useContext, useState } from "react";
import { DealData } from "../../../interfaces";
import { Web3Context } from "../../../App";
import { Contract, ethers } from "ethers";
import dealAbi from "../../../abi/deal.json";
import erc20Abi from "../../../abi/erc20.json";

const DealItem = ({
  dealData,
  getDeals,
}: {
  dealData: DealData;
  getDeals: () => Promise<void>;
}) => {
  const web3Context = useContext(Web3Context);
  const isUser0 = web3Context.account === dealData.user0;
  const [inProgress, setInProgress] = useState(false);

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

  const DealItemActionButton = () => {
    return (
      <div
        onClick={inProgress ? () => {} : () => getButtonFunction()}
        className={`flex flex-col w-[60%] h-[30px] bg-[#5c5c5c] ${
          !inProgress && !partnerAllowanceMissing() && "hover:bg-[#7a7a7a]"
        } cursor-${
          inProgress
            ? "progress"
            : partnerAllowanceMissing()
            ? "not-allowed"
            : "pointer"
        }`}
      >
        <div className="flex-1 flex">
          <div className="flex flex-1 items-center justify-center">
            {getButtonTitle()}
          </div>
          <div className="bg-mainLight w-[2px] h-[40%] self-end" />
        </div>
        <div className="bg-mainLight h-[2px] w-[70%] self-end" />
      </div>
    );
  };

  async function executeDeal() {
    setInProgress(true);
    const dealContract = new Contract(
      dealData.address,
      dealAbi,
      web3Context.signer
    );
    try {
      const tx = await dealContract.execute();
      await tx.wait();
      getDeals();
    } catch (_) {}
    setInProgress(false);
  }

  async function allow() {
    setInProgress(true);
    const dealContract = new Contract(
      isUser0 ? dealData.token0 : dealData.token1,
      erc20Abi,
      web3Context.signer
    );
    try {
      const tx = await dealContract.approve(
        dealData.address,
        ethers.parseEther(isUser0 ? dealData.amount0 : dealData.amount1)
      );
      await tx.wait();
      getDeals();
    } catch (_) {}
    setInProgress(false);
  }

  function partnerAllowanceMissing(): boolean {
    if (dealData.didUser0Allow && dealData.didUser1Allow) {
      return false;
    }
    return (
      (isUser0 && dealData.didUser0Allow) ||
      (!isUser0 && dealData.didUser1Allow)
    );
  }

  function getButtonTitle(): string {
    if (dealData.didUser0Allow && dealData.didUser1Allow) {
      return "Execute deal";
    } else if (partnerAllowanceMissing()) {
      return "Partner allowance missing";
    } else {
      return "Allow spending";
    }
  }

  function getButtonFunction() {
    if (dealData.didUser0Allow && dealData.didUser1Allow) {
      return executeDeal();
    } else if (partnerAllowanceMissing()) {
      return () => {};
    } else {
      return allow();
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
      <DealItemActionButton />
    </div>
  );
};

export default DealItem;
