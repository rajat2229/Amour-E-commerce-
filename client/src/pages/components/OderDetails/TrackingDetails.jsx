import React from "react";
import { AppDesc, HR, LoadingOverlay, Text } from "../../../components";

const TrackingDetails = ({ order }) => {


  if (order.createdAt === undefined) {
    return <LoadingOverlay />
  }
  return (
    <>
      <div className="flex">
        <AppDesc className={"text-xl font-bold"}>Order Information</AppDesc>
      </div>
      <HR className="hidden lg:flex " />
      <div className=" hidden lg:flex justify-between">
        <Text className={"font-secondary_font w-1/3 text-start"}>
          Order Number
        </Text>
        <Text className={"font-secondary_font w-1/3 text-start"}>Delivery Partner</Text>
        <Text className={"font-secondary_font w-1/3 text-start"}>Date</Text>
      </div>
      <HR className="hidden lg:flex " />
      <div className=" hidden lg:flex justify-between">
        <AppDesc className={"font-secondary_font lg:text-xl w-1/3 text-start"}>
          {order?._id}
        </AppDesc>
        <AppDesc className={"font-secondary_font lg:text-xl w-1/3 text-start"}>
          Ship Rocket
        </AppDesc>
        <AppDesc className={"font-secondary_font lg:text-xl w-1/3 text-start"}>
          {order.createdAt.slice(0, 10)}
        </AppDesc>
      </div>
      {/* mobile view  */}
      <div className=" lg:hidden flex justify-between flex-wrap">
        <div className=" w-1/2 lg:w-1/3 ">
          <Text className={"font-secondary_font text-start"}>Provider</Text>
          <AppDesc className={"font-secondary_font lg:text-xl text-start"}>
            Ship Rocket
          </AppDesc>
        </div>
        <div className=" w-1/2 lg:w-1/3 ">
          <Text className={"font-secondary_font text-start"}>
            Order Number
          </Text>
          <AppDesc
            className={
              "font-secondary_font text-sm break-words lg:text-xl text-start"
            }
          >
            {order?._id}
          </AppDesc>
        </div>
        <div className=" mt-6 lg:mt-0 w-1/2 lg:w-1/3 ">
          <Text className={"font-secondary_font text-start"}>Date</Text>
          <AppDesc
            className={
              "font-secondary_font text-xs break-words lg:text-xl text-start"
            }
          >
            {order.createdAt.slice(0, 10)}
          </AppDesc>
        </div>
      </div>
    </>
  );
};

export default TrackingDetails;
