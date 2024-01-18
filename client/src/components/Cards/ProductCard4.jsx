import React from "react";
import { AppText, AppDesc } from "../../components";
import cart from "../../assets/Home/cart.svg";
import arrow from "../../assets/Home/arrow.svg";
import heart from "../../assets/product/heartwhite.png";

const ProductCard4 = ({ item, handleProductClick, handleHeartButton, addItemToCart, relatedProduct }) => {
  return (
    <>
      <div
        className=" group relative mx-4 flex flex-col justify-center space-x-2 my-auto items-center cursor-pointer"
      >
        <div className="relative mt-16 mb-8 ">
          <div className="bg-background_primary rounded-2xl flex flex-col justify-center items-center px-5 py-5 before:absolute before:top-0 before:left-0 hover:before:rotate-6 before:-z-[1000] before:rounded-2xl before:h-full before:opacity-0 hover:before:opacity-100 before:duration-700 before:transition-all before:w-full  before:bg-primary ">
            <img
              onClick={() => handleProductClick(item._id)}
              className=" object-contain w-[240px] h-[384px] md:w-[280px] md:h-[448px] lg:w-[240px] 2xl:w-[280px] lg:h-[370px] 2xl:h-[450px] "
              src={item.images[0]}
              alt="suit1"
            />
            <div className="w-full  flex justify-between items-center">
              <div
                onClick={() => handleProductClick(item._id)}
              >
                <AppText className={"lg:hidden"}>{item?.name}</AppText>
                <AppDesc className={"hidden lg:block text-start"}>{item?.name}</AppDesc>
                <AppText>₹{item?.price}</AppText>
              </div>
              {!relatedProduct ? <div className='flex gap-1 lg:gap-5'>
                <div onClick={() => addItemToCart(item)} className='h-10 w-10 lg:h-10 lg:w-10 bg-background_secondary rounded-md flex justify-center items-center cursor-pointer'>
                  <img src={cart} alt="cart" />
                </div>
                <div onClick={() => handleHeartButton(item._id)} className='h-10 w-10 lg:h-10 lg:w-10 bg-background_secondary rounded-md flex justify-center items-center cursor-pointer'>
                  <img src={heart} alt="heart" className="h-5"/>
                </div>
              </div>
                :
                <div className='flex gap-1 lg:gap-5'>
                  <div onClick={() => handleProductClick(item._id)} className='h-10 w-10 lg:h-10 lg:w-10 bg-background_secondary rounded-md flex justify-center items-center cursor-pointer'>
                    <img src={arrow} alt="cart" />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard4;
