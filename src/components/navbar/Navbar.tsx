import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-col items-center w-full h-[80px]">
      <div className="flex justify-between items-center flex-1 w-[92%]">
        <h1 className="font-mainFont text-[20px] md:text-[26px]">
          Stulcy's DealMaker
        </h1>
        <h1>Contact</h1>
      </div>
      <div className="bg-mainGray w-[95%] h-[1px]"></div>
    </div>
  );
};

export default Navbar;
