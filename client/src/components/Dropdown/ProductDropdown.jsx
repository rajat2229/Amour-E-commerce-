import React, { useRef } from "react";
import arrow from "../../assets/product/arrow.png";

const ProductDropDown = ({ option, handleDropValue, inputVal, category }) => {
  const drop = useRef();
  const value = useRef();
  const optionRef = useRef();
  function handleClick() {
    drop.current.classList.toggle("active");
    optionRef.current.classList.toggle("hidden");
  }
  function handleValue(anything) {
    value.current.value = anything;
    handleDropValue(anything);
  }
  return (
    <div
      ref={drop}
      onClick={handleClick}
      className="dropdown cursor-pointer relative text-primary font-secondary_font font-medium  h-12 flex justify-center items-center flex-col rounded-lg border-2 border-border_primary"
    >
      <div onClick={handleClick} className="flex justify-start items-center">
        <input
          ref={value}
          type="text"
          onClick={handleClick}
          value={inputVal}
          className="rounded-md text-xl text-center placeholder:font-normal placeholder:font-secondary_font placeholder:text-center placeholder:text-primary outline-none bg-transparent cursor-pointer w-[8rem] h-8"
          placeholder={category}
          readOnly
        />
        <img  onClick={handleClick} className=" absolute right-6 ml-3 h-2 " src={arrow} alt="arrow" />
      </div>
      <div
        ref={optionRef}
        className="option hidden h-40 overflow-y-scroll text-black font-normal font-secondary_font absolute top-16 z-10 w-[100%] rounded-md bg-border_primary"
      >
        {option.map((item, key) => {
          return (
            <div
              key={key}
              className="hover:bg-background_tertiary cursor-pointer px-5 py-3"
              onClick={() => handleValue(`${item}`)}
            >
              {item.toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDropDown;
