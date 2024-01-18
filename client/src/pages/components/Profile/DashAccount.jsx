import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { AppDesc, Button, InputBox, LoadingOverlay } from '../../../components';
import { userChangePassword, userProfileUpdate } from '../../../http/profile';
import DashRightLayout from './DashRightLayout';

const DashAccount = (props) => {
  const {profile,loading} = props;
  // Change password logic
  const [changePassword, setChangePassword] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: ''
  })
  const { oldPass, confirmPass, newPass } = changePassword;
  const handleChangePasswordInput = (e) => {
    setChangePassword({ ...changePassword, [e.target.name]: e.target.value })
  }
  const handleChangePassword = async () => {
    if (oldPass === "" && newPass === "" && confirmPass === "") {
      toast.error("Please enter all password inputs");
      return;
    }
    if (newPass.length < 8) {
      toast.error("Password must be 8 characters long");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("Both passwords are not correct");
      return;
    }
    // Api Call here
    const value = await userChangePassword(oldPass, newPass, confirmPass);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      return;
    }
    if (!value.success) {
      toast.error(value.message);
      return;
    }
    if (value.success) {
      toast.success("Password updated successfully");
      setChangePassword({
        oldPass: '',
        newPass: '',
        confirmPass: ''
      })
    }
  }
  // Change password logic End

  const [name, setName] = useState(profile?.user?.name);
  const [email, setEmail] = useState(profile?.user?.email);

  const handleAccount = async(e) => {
    if(name === "" && email === ""){
      toast.error("Please enter name or email");
      return;
    }
    const value = await userProfileUpdate(name,email);
    if(value.code === "ERR_NETWORK"){
      toast.error("Some error occured");
      return;
    }
    if(!value.success){
      toast.error(value.message);
      return;
    }
    if(value.success){
      toast.success("Profile updated successfully");
    }
  }

  if(loading) return <LoadingOverlay/>
  return (
    <>
      <DashRightLayout />
      <div>
        <div className="flex flex-col gap-5 py-5">
          {/* <div className='flex gap-5 flex-col lg:flex-row'>
            {
              !fName.focus
                ?
                <InputBox value={firstName} handleFocus={(e) => handleFocus(e)} name="fname" placeholder={"First Name"} className=" w-1/2" type="text" readOnly />
                :
                <InputBox handleChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder={"First FName"} name="fname" handleBlur={(e) => handleBlur(e)} className=" w-1/2" type="text" />
            }
            {!lName.focus
              ?
              <InputBox handleFocus={(e) => handleFocus(e)} name="lname" placeholder={"Last Name"} className=" w-1/2 " type="text" />
              :
              <InputBox handleBlur={(e) => handleBlur(e)} name="lname" placeholder={"Last FName"} className=" w-1/2 " type="text" />
            }
          </div> */}
          <InputBox handleChange={(e)=>setName(e.target.value)} value={name} placeholder={"Name"} className=" w-1/2"  />
          <InputBox handleChange={(e)=>setEmail(e.target.value)} value={email} placeholder={"Email"} className=" w-1/2" />
          <div className='flex justify-center items-center lg:justify-start'>
            <Button
              handleSubmit={handleAccount}
              title="Update"
            />
          </div>
        </div>
        <div className='flex'>
          <AppDesc className={"font-bold"}>Change Password</AppDesc>
        </div>
        <div className='flex flex-col gap-5 py-5'>
          <InputBox type={"password"} handleChange={handleChangePasswordInput} value={oldPass} placeholder={"Current Password"} name="oldPass" className=" w-1/2" />
          <InputBox type={"password"} handleChange={handleChangePasswordInput} placeholder={"New Password"} value={newPass} name="newPass" className=" w-1/2" />
          <InputBox type={"password"} handleChange={handleChangePasswordInput} placeholder={"Confirm New Password"} value={confirmPass} name="confirmPass" className=" w-1/2" />
          <div className='flex justify-center items-center lg:justify-start'>
            <Button
              handleSubmit={handleChangePassword}
              title="Update"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashAccount
