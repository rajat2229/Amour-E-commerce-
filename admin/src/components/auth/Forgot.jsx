import React, { useState } from 'react'
import { ForgotUser, LoginUser } from '../../http/auth'
import Button from '../Button/Button'
import InputBox from '../Input/InputBox'
import { toast } from 'react-toastify'
import CheckEmail from '../../utility/CheckEmail'
const Forgot = ({ closeModal, handleReset }) => {
  const [btn, setBtn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
  })
  const { email} = userInfo;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (email === "") {
      toast.error("Please enter email");
      return;
    }
    if (!CheckEmail(email)) {
      toast.error("Please enter a correct email");
      return;
    }
    setBtn(true);
    const value = await ForgotUser(email);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      closeModal();
      return;
    }
    if (!value.success) {
      toast.error(value.message);
    }
    else {
      toast.success("OTP sent successfully");
      setUserInfo({
        email: '',
      })
      handleReset();
    }
    setBtn(false);
  }
  return (
    <div className='flex flex-col gap-5'>
      <InputBox
        placeholder={"Email"}
        name="email"
        value={email}
        handleChange={(e) => handleChange(e)}
      />
      <Button
        title="Send OTP"
        className={"w-full"}
        style={{borderRadius:0}}
        handleSubmit={handleSubmit}
        disabled={btn}
      />
    </div>
  )
}

export default Forgot
