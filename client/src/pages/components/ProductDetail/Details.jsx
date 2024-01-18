import React, { useRef, useState } from "react";
import { Heading, AppDesc, HR, Details2 } from "../../../components";
import downlaod from "../../../assets/product/download.png";

const Detail = ({ product, accordion, options }) => {
  const ProductInfoRef = useRef();
  const ProductInfoIconRef = useRef();
  const handleProductInfoButton = (e) => {
    ProductInfoIconRef.current.classList.toggle("rotate-180");
    ProductInfoRef.current.classList.toggle("opacity-0");
    ProductInfoRef.current.classList.toggle("h-0");
  };
  return (
    <>
      <div className=" mt-8 lg:mt-[8rem] xl:mt-[12rem] md:w-[80%] lg:w-[80%]">
        <Heading className=" md:text-start">
          {product?.name}
          {/* <span className="hidden md:inline-flex">is a dummy text</span> */}
        </Heading>
        <AppDesc className=" hidden md:inline-flex  mt-2 text-start">
          {product?.description}
        </AppDesc>
        <HR className="hidden md:flex" />
        {/* <div className=" hidden md:flex space-x-4 items-center">
          <img
            ref={ProductInfoIconRef}
            className="cursor-pointer transition-all"
            onClick={handleProductInfoButton}
            src={downlaod}
            alt="download"
          />
          <h4
            onClick={handleProductInfoButton}
            className=" cursor-pointer font-secondary_font text-primary font-semibold text-2xl "
          >
            Product Info
          </h4>
        </div> */}
        <div
          ref={ProductInfoRef}
          className="hidden transition-all duration-1000 w-[520px] lg:w-[516px] my-4 overflow-hidden text-md bg-background_primary text-primary md:flex flex-wrap font-secondary_font text-start md:text-2xl"
        >
          {accordion.map((el, i) => (
            <div key={i} className=" w-[50%] flex justify-center p-4">
              <div>
                <h4 className=" font-secondary_font font-medium text-lg sm:text-xl  min-w-[100px] md:max-w-full">
                  {el.title}
                </h4>
                <p
                  className={`font-secondary_font font-light text-base sm:text-lg md:text-lg my-2 text-start`}
                >
                  {el.content}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-between w-full">
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
      </div>
    </>
  );
};

export default Detail;
