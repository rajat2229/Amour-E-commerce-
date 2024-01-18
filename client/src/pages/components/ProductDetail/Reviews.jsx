import React from "react";
import { AppText } from "../../../components";

const Reviews = ({ review }) => {
  return (
    <>
      <div className=" hidden md:flex items-center mb-10 space-x-6">
        <span className=" px-6 h-12 rounded-full w-12 flex justify-center items-center text-primary bg-background_tertiary">
          A
        </span>
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <span className=" text-xl font-secondary_font font-semibold text-primary lg:text-2xl ">
              {review?.name}
            </span>
            {/* <span className=" text-xl font-secondary_font font-semibold text-primary lg:text-2xl opacity-70 ">
              20.2.2023
            </span> */}
          </div>
          <span className="font-light lg:mt-4 font-secondary_font text-primary text-base lg:text-lg xl:text-2xl">
            {review?.comment}
          </span>
        </div>
      </div>
      <div className=" md:hidden bg-[#eccece86] rounded-lg py-16 px-2 xs:px-4 sm:px-6  my-10">
        <AppText className="-mt-8 ml-5 mb-5">Reviews</AppText>
        <div className="flex flex-col xs:flex-row items-center space-x-6">
          <span className=" px-6 mb-2 h-12 rounded-full w-12 flex justify-center items-center text-black bg-background_tertiary">
            A
          </span>
          <div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <AppText>{review?.name}</AppText>
                <span></span>
              </div>
              <span>
                {[...Array(5)].map((star, index) => {
                  return (
                    <span
                      key={index}
                      className={`text-3xl text-background_primary`}
                    >
                      &#9733;
                    </span>
                  );
                })}
              </span>
            </div>
            <span className=" font-light font-secondary_font text-primary text-base">
              {review?.comment}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
