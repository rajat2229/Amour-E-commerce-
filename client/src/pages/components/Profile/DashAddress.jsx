import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { AppDesc, Button, InputBox, LoadingOverlay } from '../../../components';
import { userProfileUpdateAddress } from '../../../http/profile';
import DashRightLayout from './DashRightLayout';

const DashAddress = (props) => {
  const { profile, loading } = props;

  const [user, setUser] = useState({
    phone: profile?.user?.phone || "",
    address: profile?.user?.address || "",
    state: profile?.user?.state || "",
    city: profile?.user?.city || "",
    postalCode: profile?.user?.postalCode || "",
  })

  const { phone, address,state,city,postalCode } = user;

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleClick(e) {
    e.preventDefault();
    if(phone === "" || address === "" || state === "" || city === "" || postalCode === ""){
      toast.error("Please enter in all fields");
      return;
    }
    if(phone.length > 10 || phone.length < 10){
      toast.error("Phone must be 10 digit logn!");
      return;
    }
    if(postalCode.length > 6){
      toast.error("Pin Code must be 6 digit long!");
      return;
    }
    const value = await userProfileUpdateAddress(phone,address,state,city,postalCode);
    if(value.code === "ERR_NETWORK"){
      toast.error("Some error occured");
      return;
    }
    if(!value.success){
      toast.error(value.message);
      return;
    }
    if(value.success){
      toast.success("Address updated successfully");
    }
  }

  if (loading) return <LoadingOverlay />
  return (
    <>
      <DashRightLayout />
      <form onSubmit={handleClick}>
        <div className="flex flex-col gap-5 py-5">
          <InputBox handleChange={(e) => handleChange(e)} placeholder={"Phone No."} name="phone" value={phone} className=" w-1/2 " type="tel" required/>
          <InputBox handleChange={(e) => handleChange(e)} placeholder={"Address"} name="address" value={address} className=" w-1/2" required/>
          <div className='flex gap-5 flex-col lg:flex-row'>
            <InputBox handleChange={(e) => handleChange(e)} placeholder={"City"} name="city" value={city} className=" w-1/2" required/>
            <InputBox handleChange={(e) => handleChange(e)} placeholder={"Pin Code"} name="postalCode" value={postalCode} className=" w-1/2 " type="number" required/>
          </div>
          <div className='flex gap-5 flex-col lg:flex-row'>
            <InputBox handleChange={(e) => handleChange(e)} placeholder={"State"} name="state" value={state} className=" w-1/2" required/>
            <InputBox placeholder={"Country"} value="India" className=" w-1/2" readOnly/>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex justify-center items-center lg:justify-start'>
            <Button
              type="Submit"
              title="Update"
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default DashAddress
