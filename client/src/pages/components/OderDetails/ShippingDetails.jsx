import React from "react";
import { AppDesc, HR, Text } from "../../../components";
const ShippingDetails = ({info}) => {
  return (
    <>
      <div className="flex">
        <AppDesc className={"text-xl mt-4 font-bold"}>Shipping Details</AppDesc>
      </div>
    <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          Email
        </Text>
        <AppDesc
          className={"font-secondary_font break-all lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          {info?.email}
        </AppDesc>
      </div>
      <HR className="hidden lg:flex " />
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          Phone Number
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          {info?.phoneNo}
        </AppDesc>
      </div>
      <HR className="hidden lg:flex " />
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
        Address
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          {info?.address}
        </AppDesc>
      </div>
      <HR className="hidden lg:flex " />
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          City
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          {info?.city}
        </AppDesc>
      </div>
      <HR className="hidden lg:flex " />
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          Pin Code
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          {info?.pinCode}
        </AppDesc>
      </div>
      <HR className="hidden lg:flex " />
      <div className="flex justify-between">
        <Text className={"font-secondary_font w-1/2 lg:w-1/3 text-start"}>
          State
        </Text>
        <AppDesc
          className={"font-secondary_font lg:text-xl w-1/2 lg:w-1/3 text-start"}
        >
          {info?.state}
        </AppDesc>
      </div>
    </>
  );
};

export default ShippingDetails;
