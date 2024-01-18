import React from "react";
import { AppDesc } from "../../../components";
import heartWhite from "../../../assets/product/heartwhite.png";

const Details = ({
  size,
  product,
  options,
  handleSize,
  addProductWishlist,
  handleCartButton,
}) => {
  return (
    <>
      <div className=" hidden md:inline-flex mb-5 md:mb-[230px] ">
        <div className=" xl:-mt-10 md:-mt-0 lg:-mt-16 right-0 flex h-[220px] w-[516px] justify-center items-start flex-col bg-background_primary">
          <div className=" text-xl font-secondary_font text-primary font-medium flex justify-start items-center ">
            <div className=" flex w-[70%] pl-20 justify-start items-center space-x-4">
              <span>Size: </span>
              {options.map((el, i) => (
                <span
                  key={i}
                  onClick={() => {
                    handleSize(el);
                  }}
                  className={`cursor-pointer px-2 border-2 rounded-md border-primary ${size === el && "bg-primary"} `}
                >
                  <p className={`${size === el && 'text-white'}`}>{el.toUpperCase()}</p>
                </span>
              ))}
            </div>
          </div>
          <div className={`border-b border-[#0003] w-[95%] block my-4`}></div>
          <div className=" flex mt-4 items-center justify-center space-x-4 w-full px-6">
            <AppDesc className=" w-[30%] font-medium ">₹{product?.price} </AppDesc>
            <div className=" flex items-center justify-center space-x-4  w-[70%]">
              <button
                onClick={() => addProductWishlist(product?._id)}
                className=" rounded-2xl px-4 py-3 bg-primary"
              >
                <img src={heartWhite} alt="" />
              </button>
              <button
                onClick={() => handleCartButton(product)}
                className=" text-white rounded-2xl font-semibold px-8 py-3 bg-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
