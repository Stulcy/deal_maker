import { Contract, ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import dealDeployerAbi from "../../abi/dealDeployer.json";
import { Web3Context } from "../../App";
import { DEAL_DEPLOYER_ADDRESS } from "../../constants";

const DealsList = () => {
  const web3Context = useContext(Web3Context);
  const [deals, setDeals] = useState<string[]>([]);

  async function getDeals() {
    const dealDeployerContract = new Contract(
      DEAL_DEPLOYER_ADDRESS,
      dealDeployerAbi,
      web3Context.signer
    );
    const res = await dealDeployerContract.getDeals(web3Context.account);
    setDeals(res.map((item: string) => item));
  }

  useEffect(() => {
    if (web3Context.signer) getDeals();
  }, [web3Context.signer]);

  return (
    <div className="flex-1 flex flex-col items-center">
      <h1 className="text-[26px]">DealsList</h1>
      {deals.map((deal) => (
        <h1 key={deal}>{deal}</h1>
      ))}
    </div>
  );
};

export default DealsList;
