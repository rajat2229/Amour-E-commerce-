import React from "react";
import {
  Accordion,
  ProductDropDown,
  AppDesc,
  Button,
} from "../../../components";
import heartWhite from "../../../assets/product/heartwhite.png";
import icon1 from "../../../assets/product/icon1.png";
import shop from "../../../assets/product/shop.png";
const mobileDetails = ({
  product,
  handleColor,
  handleSize,
  options,
  handleHeartButton,
  addProductWishlist,
  handleCartButton,
  accordion,
}) => {
  return (
    <>
      <div className="md:hidden flex items-center justify-between">
        <div className="text-xl font-secondary_font text-primary font-medium">
          <h4>{product?.name}</h4>
          <h3 className="font-semibold">₹{product?.price}</h3>
        </div>
      </div>
      <div>
        <div className="md:hidden flex justify-between w-full bg-background_primary mt-6">
          <div className=" w-[50%] flex justify-center p-4">
            <div>
              <h4 className=" font-secondary_font font-medium text-lg sm:text-xl  min-w-[100px] md:max-w-full">
                {"Bust(inches)"}
              </h4>
              <p
                className={`font-secondary_font font-light text-base sm:text-lg md:text-lg my-2 text-start`}
              >
                {"36"}
              </p>
              <p
                className={`font-secondary_font font-light text-base sm:text-lg md:text-lg my-2 text-start`}
              >
                {"38"}
              </p>
              <p
                className={`font-secondary_font font-light text-base sm:text-lg md:text-lg my-2 text-start`}
              >
                {"40"}
              </p>
              <p
                className={`font-secondary_font font-light text-base sm:text-lg md:text-lg my-2 text-start`}
              >
                {"42"}
              </p>
            </div>
          </div>
          <div className=" w-[50%] flex justify-center p-4">
            <div>
              <h4 className=" font-secondary_font font-medium text-lg sm:text-xl  min-w-[100px] md:max-w-full">
                {"Size"}
              </h4>
              <p
                className={`font-secondary_font font-light text-base sm:text-lg md:text-lg my-2 text-start`}
              >
                {"S"}
              </p>
              <p
                className={`font-secondary_font font-light text-base sm:text-lg md:text-lg my-2 text-start`}
              >
                {"M"}
              </p>
              <p
                className={`font-secondary_font font-light text-base sm:text-lg md:text-lg my-2 text-start`}
              >
                {"L"}
              </p>
              <p
                className={`font-secondary_font font-light text-base sm:text-lg md:text-lg my-2 text-start`}
              >
                {"XL"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:hidden my-6">
        <ProductDropDown
          handleDropValue={handleSize}
          category={"Select sizes"}
          option={options}
        />
        <div className="flex my-6 justify-between items-center">
          <button
            onClick={() => addProductWishlist(product?._id)}
            className=" rounded-2xl px-4 py-3 bg-primary"
          >
            <img src={heartWhite} alt="heart" />
          </button>
          <Button
            handleSubmit={() => handleCartButton(product)}
            title={"Buy Now"}
            className="font-semibold"
          />
          <button
            onClick={() => handleCartButton(product)}
            className=" rounded-2xl px-5 py-5 bg-primary"
          >
            <img src={shop} alt="shop" />
          </button>
        </div>
        <AppDesc className=" mt-10 text-start">
          Presenting you another finely put together kurti straight from the
          house of amour. Cotton and Comfy Traditional for you to be ethnic in
          style.
        </AppDesc>
        <div className=" w-[100vw] my-10 -ml-6 bg-primary p-4 pb-10">
          <div className=" text-white font-secondary_font font-semibold px-2 my-3 text-lg min-w-[100px] md:max-w-full">
            Product Info
          </div>
          {accordion.map((e, i) => (
            <Accordion key={i} title={e.title} content={e.content} />
          ))}
        </div>
      </div>
    </>
  );
};

export default mobileDetails;
