import Lottie from "lottie-react";
import dealAnimation from "./lottie/deal_animation.json";
import InputField from "../input/InputField";
import { useContext, useState } from "react";
import { Contract, ethers } from "ethers";
import { checkAddress } from "../../helpers/checking";
import erc20Abi from "../../abi/erc20.json";
import { Web3Context } from "../../App";
import { DEAL_DEPLOYER_ADDRESS } from "../../constants";
import dealDeployerAbi from "../../abi/dealDeployer.json";

const DealMake = () => {
  const web3Context = useContext(Web3Context);
  const [partnerAddress, setPartnerAddress] = useState("");
  const [partnerAddressError, setPartnerAddressError] = useState("");
  const [token0Address, setToken0Address] = useState("");
  const [token0AddressError, setToken0AddressError] = useState("");
  const [token0Amount, setToken0Amount] = useState("");
  const [token0AmountError, setToken0AmountError] = useState("");
  const [token1Address, setToken1Address] = useState("");
  const [token1AddressError, setToken1AddressError] = useState("");
  const [token1Amount, setToken1Amount] = useState("");
  const [token1AmountError, setToken1AmountError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initiatingDeal, setInitiatingDeal] = useState(false);

  function resetErrors() {
    setPartnerAddressError("");
    setToken0AddressError("");
    setToken0AmountError("");
    setToken1AddressError("");
    setToken1AmountError("");
  }

  async function checkInputFields() {
    resetErrors();
    setLoading(true);
    if (!checkAddress(partnerAddress)) {
      setPartnerAddressError("Wrong format");
    } else if (!checkAddress(token0Address)) {
      setToken0AddressError("Wrong format");
    } else if (!checkAddress(token1Address)) {
      setToken1AddressError("Wrong format");
    } else if (partnerAddress === web3Context.account) {
      setPartnerAddressError("Same as sender");
    } else {
      try {
        const token0Contract = new Contract(
          token0Address,
          erc20Abi,
          web3Context.signer
        );
        const balance0 = ethers.formatEther(
          await token0Contract.balanceOf(web3Context.account)
        );
        if (
          Number(token0Amount) === 0 ||
          Number(balance0) < Number(token0Amount)
        ) {
          setToken0AmountError("Insufficient amount");
          setLoading(false);
          return;
        }
        const token1Contract = new Contract(
          token1Address,
          erc20Abi,
          web3Context.signer
        );
        const balance1 = ethers.formatEther(
          await token1Contract.balanceOf(partnerAddress)
        );
        if (
          Number(token1Amount) === 0 ||
          Number(balance1) < Number(token1Amount)
        ) {
          setToken1AmountError("Insufficient amount");
          setLoading(false);
          return;
        }
        // If everything goes well
        initiateDeal();
      } catch (_) {}
    }
    setLoading(false);
  }

  async function initiateDeal() {
    setInitiatingDeal(true);
    const dealDeployerContract = new Contract(
      DEAL_DEPLOYER_ADDRESS,
      dealDeployerAbi,
      web3Context.signer
    );
    try {
      const tx = await dealDeployerContract.initiateDeal(
        partnerAddress,
        token0Address,
        token1Address,
        ethers.parseEther(token0Amount),
        ethers.parseEther(token1Amount)
      );
      await tx.wait();
      window.location.reload();
    } catch (_) {}
    setInitiatingDeal(false);
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      {initiatingDeal ? (
        <Lottie animationData={dealAnimation} />
      ) : (
        <div className="flex flex-col items-center py-8 h-fit w-[80%] sm:w-[512px] bg-[#545454] gap-4">
          <InputField
            isNumeric={false}
            title={"🤝 Partner address"}
            setter={setPartnerAddress}
            value={partnerAddress}
            error={partnerAddressError}
          />
          <InputField
            isNumeric={false}
            title={"🙋🏽‍♂️ Your token address"}
            setter={setToken0Address}
            value={token0Address}
            error={token0AddressError}
          />
          <InputField
            isNumeric={true}
            title={"🙋🏽‍♂️ Your token amount"}
            setter={setToken0Amount}
            value={token0Amount}
            error={token0AmountError}
          />
          <InputField
            isNumeric={false}
            title={"🤝 Partner token address"}
            setter={setToken1Address}
            value={token1Address}
            error={token1AddressError}
          />
          <InputField
            isNumeric={true}
            title={"🤝 Partner token amount"}
            setter={setToken1Amount}
            value={token1Amount}
            error={token1AmountError}
          />
          <div
            onClick={() => checkInputFields()}
            className={`flex ${
              loading ? "cursor-progress" : "cursor-pointer"
            } bg-mainBlue hover:bg-[#7a7a7a] h-[40px] w-[50%] mt-8 text-white`}
          >
            <div className="w-[2px] bg-mainLight h-[40%]" />
            <div className="flex flex-1 flex-col">
              <div className="h-[2px] bg-mainLight w-[40%]" />
              <div className="flex flex-1 items-center justify-center">
                {loading ? "Checking..." : "Make a deal"}
              </div>
              <div className="h-[2px] bg-mainLight w-[40%] self-end" />
            </div>
            <div className="w-[2px] bg-mainLight h-[40%] self-end" />
          </div>
        </div>
      )}
      <div className="bg-mainLight w-full h-[1px] md:hidden mt-8" />
    </div>
  );
};

export default DealMake;
