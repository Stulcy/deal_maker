import { Contract, ethers } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import dealDeployerAbi from "../../abi/dealDeployer.json";
import dealAbi from "../../abi/deal.json";
import erc20Abi from "../../abi/erc20.json";
import { Web3Context } from "../../App";
import { DEAL_DEPLOYER_ADDRESS } from "../../constants";
import DealItem from "./components/DealItem";
import { DealData } from "../../interfaces";

const DealsList = () => {
  const web3Context = useContext(Web3Context);
  const [deals, setDeals] = useState<DealData[]>([]);
  const [loading, setLoading] = useState(true);

  const getDeals = useCallback(async () => {
    setDeals([]);
    setLoading(true);
    const dealDeployerContract = new Contract(
      DEAL_DEPLOYER_ADDRESS,
      dealDeployerAbi,
      web3Context.signer
    );
    try {
      const res = await dealDeployerContract.getDeals(web3Context.account);
      let dealList: string[] = res.map((item: string) => item);
      dealList = dealList.filter((obj) => {
        return obj !== "0x0000000000000000000000000000000000000000";
      });
      const dealDataList: DealData[] = [];
      for (const dealAddress of dealList) {
        const dealContract = new Contract(
          dealAddress,
          dealAbi,
          web3Context.signer
        );
        const isCompleted = await dealContract.completed();
        if (isCompleted) return;
        const token0 = await dealContract.token0();
        const token0Name = await new Contract(
          token0,
          erc20Abi,
          web3Context.signer
        ).name();
        const token1 = await dealContract.token1();
        const token1Name = await new Contract(
          token1,
          erc20Abi,
          web3Context.signer
        ).name();
        const user0 = await dealContract.user0();
        const user1 = await dealContract.user1();
        const amount0 = ethers.formatEther(await dealContract.amount0());
        const amount1 = ethers.formatEther(await dealContract.amount1());
        const didUser0Allow = await dealContract.didUserAllow(user0);
        const didUser1Allow = await dealContract.didUserAllow(user1);
        dealDataList.push({
          address: dealAddress,
          token0: token0,
          token0Name: token0Name,
          token1: token1,
          token1Name: token1Name,
          user0: user0,
          user1: user1,
          amount0: amount0,
          amount1: amount1,
          didUser0Allow: didUser0Allow,
          didUser1Allow: didUser1Allow,
        });
      }
      setDeals(dealDataList);
    } catch (_) {}
    setLoading(false);
  }, [web3Context.account, web3Context.signer]);

  useEffect(() => {
    if (web3Context.signer) getDeals();
  }, [web3Context.signer, getDeals]);

  return (
    <div className="flex-1 flex flex-col items-center order-last lg:order-first">
      <h1 className="text-[26px] my-4">Open deals</h1>
      {loading ? (
        <h1>Loading ...</h1>
      ) : deals.length === 0 ? (
        <h1>No active deals found :/</h1>
      ) : (
        <>
          {deals.map((dealData) => (
            <DealItem
              key={dealData.address}
              dealData={dealData}
              getDeals={getDeals}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default DealsList;
