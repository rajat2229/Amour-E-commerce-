import React, { useEffect, useState } from "react";
import { InputBox, LoadingOverlay } from "../../../components";
import { userProfile } from "../../../http/profile";
import DashRightLayout from "./DashRightLayout";
import { toast } from 'react-toastify'

const DashProfile = (props) => {
  const {profile,loading} = props;

  if (loading) return <LoadingOverlay />;
  else
    return (
      <>
        <DashRightLayout />
        <form className="flex flex-col gap-5 py-5">
          <InputBox placeholder={"Display Name"} value={profile?.user?.name} readOnly disabled />
          <div className='flex gap-5 flex-col lg:flex-row'>
            <InputBox placeholder={"Email"} type="email" value={profile?.user?.email} readOnly disabled />
            <InputBox placeholder={"Phone No."} className=" w-1/2 " type="tel" value={profile?.user?.phone} readOnly disabled />
          </div>
          <InputBox placeholder={"Street Address"} value={profile?.user?.address} readOnly disabled />
          <div className="flex gap-5 flex-col lg:flex-row">
            <InputBox placeholder={"Town/City"} className=" w-1/2" value={profile?.user?.city} readOnly disabled />
          <InputBox placeholder={"PIN"} className=" w-1/2" value={profile?.user?.postalCode} readOnly disabled />
          </div>
          <div className="flex gap-5 flex-col lg:flex-row">
            <InputBox placeholder={"State"} className=" w-1/2" value={profile?.user?.state}readOnly disabled />
          <InputBox placeholder={"Country"} className=" w-1/2" value={"India"} readOnly disabled />
          </div>
        </form>
      </>
    );
};

export default DashProfile;
