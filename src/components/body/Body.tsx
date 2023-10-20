import React from "react";
import DealsList from "./DealsList";
import DealMake from "./DealMake";

const Body = () => {
  return (
    <div className="w-full h-fit flex justify-center">
      <div className="w-[95%] h-fit flex">
        <DealsList />
        <DealMake />
      </div>
    </div>
  );
};

export default Body;
