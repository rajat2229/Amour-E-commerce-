import React, { useRef } from "react";
import arrow from "../../assets/productList/arrow.png";

const DropDown = ({ option, handleDropValue, inputVal, category }) => {
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
      className="dropdown  cursor-pointer relative text-white font-secondary_font font-medium mx-1 md:mx-2 h-12 flex justify-center items-center flex-col rounded-lg bg-primary hover:bg-primary_hover"
    >
      <div onClick={handleClick} className="flex justify-center items-center">
        <input
          ref={value}
          type="text"
          onClick={handleClick}
          value={inputVal}
          className="rounded-md text-base sm:text-xl placeholder:font-normal placeholder:font-secondary_font placeholder:text-center text-center placeholder:text-white outline-none bg-transparent cursor-pointer w-[6rem] xs:w-[7rem] sm:w-[10.5rem] md:w-[11rem] ml-2 xl:ml-3 h-8"
          placeholder={category}
          readOnly
        />
        <img  onClick={handleClick} className="mr-2 sm:mr-3 h-2 sm:h-3 " src={arrow} alt="arrow" />
      </div>
      <div
        ref={optionRef}
        className="option hidden h-40 overflow-y-scroll text-black font-normal font-secondary_font absolute top-16 z-10 w-[105%] rounded-md bg-background_primary"
      >
        {option.map((item, key) => {
          return (
            <div
              key={key}
              className="hover:bg-background_tertiary cursor-pointer px-5 py-3"
              onClick={() => handleValue(`${item}`)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropDown;
