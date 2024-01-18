import React, { useState } from "react";
import DropDown from "../../../components/Dropdown";

const Filters = ({ ShowDropDown, setShowDropDown }) => {
  // DropDown Logic
  const [category, setCategory] = useState("Fit");
  const [category2, setCategory2] = useState("Neckline");
  const [category3, setCategory3] = useState("Neckline");
  const [category4, setCategory4] = useState("Neckline");
  const handleDropValue = (val) => {
    setCategory(val);
    setShowDropDown(false);
  };
  const handleDropValue2 = (val) => {
    setCategory2(val);
    setShowDropDown(false);
  };
  const handleDropValue3 = (val) => {
    setCategory3(val);
    setShowDropDown(false);
  };
  const handleDropValue4 = (val) => {
    setCategory4(val);
    setShowDropDown(false);
  };
  const filterList = [
    ["Fit", "Neckline", "Fabric", "Color", "Neckline", "Neckline"],
    ["Neckline", "Fabric", "Color", "Neckline", "Neckline"],
    [" Fabric", "Neckline", "Fit", "Color", "Neckline", "Neckline"],
    ["Color", "Fit", "Neckline", "Fabric", "Neckline", "Neckline"],
    ["Neckline", "Fabric", "Color", "Neckline", "Neckline"],
    ["Neckline", "Fit", "Neckline", "Fabric", "Color", "Neckline"],
  ];

  return (
    <>
      <div className="hidden mt-16 lg:flex justify-evenly items-center px-10">
        <DropDown
          inputVal={category}
          handleDropValue={handleDropValue}
          option={["Food", "Accessories", "Treat", "Supplement", "Clothing"]}
        />
        <DropDown
          inputVal={category2}
          handleDropValue={handleDropValue2}
          option={["Royal", "Pedigree", "Whiskas", "Dog", "Cat"]}
        />
        <DropDown
          inputVal={category3}
          handleDropValue={handleDropValue3}
          option={["Food", "Accessories", "Treat", "Supplement", "Clothing"]}
        />
        <DropDown
          inputVal={category4}
          handleDropValue={handleDropValue4}
          option={["Whiskas", "Dog", "Cat", "fjasdf"]}
        />
        {/* <DropDown
      inputVal={category5}
      handleDropValue={handleDropValue5}
      option={["Food", "Accessories", "Treat", "Supplement"]}
    />
    <DropDown
      inputVal={category6}
      handleDropValue={handleDropValue6}
      option={["Food", "Accessories", "Treat", "Supplement", "Clothing"]}
    /> */}
        {/* <div className="hidden mt-16 mb-8 lg:flex justify-evenly items-center">
      {filterList.map((e, i) => (
        <DropDown
          key={i}
          handleDropValue={(e) => {
          }}
          option={e}
          category={e[0]}
        />
      ))}
    </div> */}
      </div>
      {/* mobile view  */}
      <div
        className={`absolute lg:hidden ${
          !ShowDropDown && "hidden"
        }  top-[15rem] py-4 mx-6 z-[99999]  bg-white border-2 rounded-xl border-border_primary`}
      >
        <div className="flex-wrap flex gap-4 md:gap-6 justify-evenly items-center">
          <DropDown
            inputVal={category}
            handleDropValue={handleDropValue}
            option={["Food", "Accessories", "Treat", "Supplement", "Clothing"]}
          />
          <DropDown
            inputVal={category2}
            handleDropValue={handleDropValue2}
            option={["Royal", "Pedigree", "Whiskas", "Dog", "Cat"]}
          />
          <DropDown
            inputVal={category3}
            handleDropValue={handleDropValue3}
            option={["Food", "Accessories", "Treat", "Supplement", "Clothing"]}
          />
          <DropDown
            inputVal={category4}
            handleDropValue={handleDropValue4}
            option={["Whiskas", "Dog", "Cat", "fjasdf"]}
          />
          {/* <DropDown
        inputVal={category5}
        handleDropValue={handleDropValue5}
        option={["Food", "Accessories", "Treat", "Supplement"]}
      />
      <DropDown
        inputVal={category6}
        handleDropValue={handleDropValue6}
        option={["Food", "Accessories", "Treat", "Supplement", "Clothing"]}
      /> */}
        </div>
      </div>
    </>
  );
};

export default Filters;
