import React, { useState } from "react";
import { AppDesc } from "../components";
import arrowwhite from "../assets/product/arrowwhite.png";

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className=" border-b border-border_primary p-2">
      <div
        className=" cursor-pointer accordion-title my-1 flex justify-between items-center"
        onClick={() => setIsActive(!isActive)}
      >
        <div className=" text-white font-secondary_font font-medium text-base min-w-[100px] md:max-w-full">{title}</div>
        <img src={arrowwhite} alt="arrow" />
      </div>
      <AppDesc className={`transition-[height] duration-1000 ${!isActive && " h-0 overflow-hidden"} text-white  my-2 text-start`}>{content}</AppDesc>
    </div>
  );
};

export default Accordion;
