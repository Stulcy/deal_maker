import Lottie from "lottie-react";
import dealAnimation from "./lottie/deal_animation.json";
import MakeDealModal from "../modals/Modal";

const DealMake = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Lottie animationData={dealAnimation} />
      <MakeDealModal />
      <div className="bg-mainLight w-full h-[1px] md:hidden mt-8" />
    </div>
  );
};

export default DealMake;
