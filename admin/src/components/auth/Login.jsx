import React, { useContext, useState } from 'react'
import { LoginUser } from '../../http/auth'
import Button from '../Button/Button'
import InputBox from '../Input/InputBox'
import AppText from '../Text/AppText'
import { toast } from 'react-toastify'
import CheckEmail from '../../utility/CheckEmail'
import { AuthContext } from '../../Context/userContext'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ""
  })
  const { email, password } = userInfo;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      toast.error("Please enter email & password");
      return;
    }
    if (!CheckEmail(email)) {
      toast.error("Please enter a correct email");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be\n 8 characters long");
      return;
    }
    const value = await LoginUser(email, password);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      return;
    }
    if (!value.success) {
      toast.error(value.message);
    }
    else if (value.user.role === 'user') {
      toast.warning("You are not an admin");
    }
    else {
      localStorage.setItem("WEB_APP_ADMIN", JSON.stringify(value.token));
      setUser(value.token)
      setUserInfo({
        email: '',
        password: ""
      })
      navigate("/dashboard");
    }
  }
  return (
    <div className='flex flex-col gap-5'>
      <InputBox
        placeholder={"Email"}
        name="email"
        value={email}
        handleChange={(e) => handleChange(e)}
      />
      <InputBox
        placeholder={"Password"}
        name="password"
        value={password}
        type="password"
        handleChange={(e) => handleChange(e)}
      />
      {/* <AppText handleClick={handleForgot} className={"w-[300px] cursor-pointer"} >Forgot Password ?</AppText> */}
      <Button
        title="Login"
        className={"w-full"}
        style={{ borderRadius: 0 }}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Login
