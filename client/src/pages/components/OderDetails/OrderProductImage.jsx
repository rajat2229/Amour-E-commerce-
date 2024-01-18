import React from "react";
const OrderProductImage = ({ src }) => {
  return (
    <section className="flex justify-center items-center w-[100%] lg:w-[25%] flex-col my-10 ">
      <img src={src} alt="product" />
      <h4 className="text-2xl font-bold text-primary font-primary_font text-center md:text-4xl 2xl:text-5xl">
        Lorem Ipsum
      </h4>
    </section>
  );
};

export default OrderProductImage;
