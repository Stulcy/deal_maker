import { useContext, useState } from "react";
import InputField from "../input/InputField";
import { checkAddress } from "../../helpers/checking";
import { Web3Context } from "../../App";
import { Contract, ethers } from "ethers";
import erc20Abi from "../../abi/erc20.json";

const MakeDealModal = () => {
  const web3Context = useContext(Web3Context);
  const [showModal, setShowModal] = useState(false);
  const [partnerAddress, setPartnerAddress] = useState("");
  const [token0Address, setToken0Address] = useState("");
  const [token0Amount, setToken0Amount] = useState("");
  const [token1Address, setToken1Address] = useState("");
  const [token1Amount, setToken1Amount] = useState("");
  const [loading, setLoading] = useState(false);

  function handleShowModal(e: React.MouseEvent) {
    if ((e.target as any).id === "no-hiding") return;
    setShowModal(false);
  }

  async function checkInputFields() {
    setLoading(true);
    if (!checkAddress(partnerAddress)) {
      setPartnerAddress("Wrong format");
    } else if (!checkAddress(token0Address)) {
      setToken0Address("Wrong format");
    } else if (!checkAddress(token1Address)) {
      setToken1Address("Wrong format");
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
        if (balance0 < token0Amount) {
          setToken0Amount("Insufficient amount");
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
        if (balance1 < token1Amount) {
          setToken0Amount("Insufficient amount");
          setLoading(false);
          return;
        }
        // If everything goes well
        setShowModal(false);
      } catch (_) {}
    }
    setLoading(false);
  }

  return (
    <>
      <h1
        onClick={() => setShowModal(true)}
        className="text-[32px] my-4 animate-bounce hover:text-mainBlue hover:text-[36px] cursor-pointer"
      >
        Make a deal?
      </h1>
      {showModal && (
        <div
          onClick={(e) => handleShowModal(e)}
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
          <div
            onClick={(e) => handleShowModal(e)}
            id="no-hiding"
            className="flex flex-col items-center p-8 h-fit w-[80%] sm:w-[512px] bg-[#545454] gap-4"
          >
            <InputField
              isNumeric={false}
              title={"🤝 Partner address"}
              setter={setPartnerAddress}
            />
            <InputField
              isNumeric={false}
              title={"🙋🏽‍♂️ Your token address"}
              setter={setToken0Address}
            />
            <InputField
              isNumeric={true}
              title={"🙋🏽‍♂️ Your token amount"}
              setter={setToken0Amount}
            />
            <InputField
              isNumeric={false}
              title={"🤝 Partner token address"}
              setter={setToken1Address}
            />
            <InputField
              isNumeric={true}
              title={"🤝 Partner token amount"}
              setter={setToken1Amount}
            />
            <button
              onClick={() => checkInputFields()}
              className={`flex justify-center items-center cursor-${
                loading ? "progress" : "pointer"
              } bg-mainBlue h-[40px] w-[50%] mt-8 text-white`}
            >
              {loading ? "Loading..." : "Make a deal!"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MakeDealModal;
