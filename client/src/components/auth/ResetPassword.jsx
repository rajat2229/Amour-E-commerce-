import React, { useState } from 'react'
import { ResetUser } from '../../http/auth'
import Button from '../Button/Button'
import InputBox from '../Input/InputBox'
import { toast } from 'react-toastify'


const ResetPassword = ({ closeModal }) => {
  const [btn, setBtn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    password: "",
    confirmPassword:"",
    otp:''
  })
  const { password,confirmPassword,otp } = userInfo;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (confirmPassword === "" && password === "" && otp === "") {
      toast.error("Please enter all fields");
      return;
    }
    if(password !== confirmPassword){
      toast.error("Password don't match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be\n 8 characters long");
      return;
    }
    setBtn(true);
    const value = await ResetUser(password,confirmPassword,otp);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      closeModal();
      return;
    }
    if (!value.success) {
      toast.error(value.message);
    }
    else {
      toast.success("Password changed successfully");
      setUserInfo({
        password: "",
        confirmPassword:"",
        otp:""
      })
      closeModal();
    }
    setBtn(false);
  }
  return (
    <div className='flex flex-col gap-5'>
      <InputBox
        placeholder={"Password"}
        name="password"
        value={password}
        type="password"
        handleChange={(e) => handleChange(e)}
      />
      <InputBox
        placeholder={"Confrim Password"}
        name="confirmPassword"
        value={confirmPassword}
        type="password"
        handleChange={(e) => handleChange(e)}
      />
      <InputBox
        placeholder={"OTP"}
        name="otp"
        value={otp}
        type="number"
        max={6}
        handleChange={(e) => handleChange(e)}
      />
      <Button
        title="Submit"
        className={"w-full"}
        style={{borderRadius:0}}
        handleSubmit={handleSubmit}
        disabled={btn}
      />
    </div>
  )
}

export default ResetPassword
