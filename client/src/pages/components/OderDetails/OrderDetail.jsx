import React from "react";
import { AppDesc, HR, LoadingOverlay, ProductCard3, Text } from "../../../components";

const OrderDetail = (props) => {


  if (!props?.orderedItems || props?.orderedItems === null || props?.orderedItems.length === 0) {
    return <LoadingOverlay />
  }

  return (
    <>
      <div className="flex">
        <AppDesc className={"text-xl mt-6 font-bold"}>Order Detail</AppDesc>
      </div>
      <div className=" hidden lg:flex justify-between">
        <Text className={"font-secondary_font w-1/3 text-start"}>Product</Text>
        <Text className={"font-secondary_font w-1/3 text-start"}>Price</Text>
        <Text className={"font-secondary_font w-1/3 text-start"}>Size</Text>
      </div>
      <HR />
      {

        props?.orderedItems.map((item, key) => (
          <div key={key} className="hidden lg:block">
            <div className=" hidden lg:flex justify-between items-center">
              <div className="w-1/3 flex gap-10 items-center">
                <ProductCard3 img={item?.product?.images[0]} />
                <AppDesc className={"font-secondary_font lg:text-xl w-full text-start"}>
                  {item?.product?.name}
                </AppDesc>
              </div>
              <AppDesc className={"font-secondary_font lg:text-xl w-1/3 text-start"}>
                ₹{item?.product?.price} x {item?.quantity}
              </AppDesc>
              <AppDesc className={"font-secondary_font font-bold lg:text-xl w-1/3 text-start"}>
                {item?.size.toUpperCase()}
              </AppDesc>
            </div>
            <HR />
          </div>
        ))
      }
      {
        props?.orderedItems.map((item, key) => (
          <div key={key} className="lg:hidden">
            <div className="lg:hidden flex justify-between">
              <div className=" w-1/2">
                <div className="flex flex-col justify-center ">
                  <ProductCard3 img={item?.product?.images[0]} />
                  <AppDesc className={"font-secondary_font lg:text-xl text-start"}>
                    <span className="font-bold">Name:</span> {item?.product?.name}
                  </AppDesc>
                </div>
              </div>
              <div className=" w-1/2">
                <Text className={"font-secondary_font text-start"}>Size</Text>
                <AppDesc className={"font-secondary_font font-bold lg:text-xl text-start"}>
                  {item?.size.toUpperCase()}
                </AppDesc>
                <Text className={"font-secondary_font text-start mt-5 md:mt-10"}>Price</Text>
                <AppDesc className={"font-secondary_font lg:text-xl text-start"}>
                  ₹{item?.product?.price} X {item?.quantity}
                </AppDesc>
              </div>
            </div>
            <HR />
          </div>
        ))
      }

      {/* <HR /> */}
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          Subtotal
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          ₹{props?.subTotalPrice}
        </AppDesc>
      </div>
      <HR />
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          Shipping
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          ₹{props?.deliveryCharges === 0 ? "Free" : props?.deliveryCharges}
        </AppDesc>
      </div>
      <HR />
      {/* <HR /> */}
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          Payment Method
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          {props?.paymentMethod === 'cod' ? "Cash on Delivery" : "Online Payment"}
        </AppDesc>
      </div>
      <HR />
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          Order Status
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          {props?.orderStatus}
        </AppDesc>
      </div>
      <HR />
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          Payment Status
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          {props?.paymentStatus.toUpperCase()}
        </AppDesc>
      </div>
      <HR />
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          Total
        </Text>
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          ₹{props?.totalPrice}
        </Text>
      </div>
    </>
  );
};

export default OrderDetail;
