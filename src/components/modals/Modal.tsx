import { useState } from "react";
import NumberInputField from "../input/NumberInputField";

const MakeDealModal = () => {
  const [showModal, setShowModal] = useState(false);

  function handleShowModal(e: React.MouseEvent) {
    if ((e.target as any).id === "no-hiding") return;
    setShowModal(false);
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
            className="flex flex-col items-center p-4 h-[300px] w-[80%] sm:w-[512px] bg-[#545454]"
          >
            <NumberInputField />
          </div>
        </div>
      )}
    </>
  );
};

export default MakeDealModal;
