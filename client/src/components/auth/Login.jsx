import React, { useContext, useState } from 'react'
import { LoginUser } from '../../http/auth'
import Button from '../Button/Button'
import InputBox from '../Input/InputBox'
import AppText from '../Text/AppText'
import { toast } from 'react-toastify'
import CheckEmail from '../../utility/CheckEmail'
import { AuthContext } from '../../Context/userContext'
import { useNavigate } from 'react-router-dom'
const Login = ({ closeModal,handleForgot }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [btn, setBtn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ""
  })
  const { email, password } = userInfo;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const history = localStorage.getItem("history");
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
    setBtn(true);
    const value = await LoginUser(email, password);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      closeModal();
      return;
    }
    if (!value.success) {
      toast.error(value.message);
    }
    else {
      toast.success("Login successfully");
      localStorage.setItem("WEB_APP", JSON.stringify(value.token));
      setUser(value.token)
      setUserInfo({
        email: '',
        password: ""
      })
      closeModal();
      if(history !== null) navigate(history);
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
      <InputBox
        placeholder={"Password"}
        name="password"
        value={password}
        type="password"
        handleChange={(e) => handleChange(e)}
      />
      <AppText handleClick={handleForgot} className={"w-[300px] cursor-pointer"} >Forgot Password ?</AppText>
      <Button
        title="Login"
        className={"w-full"}
        style={{borderRadius:0}}
        handleSubmit={handleSubmit}
        disabled={btn}
      />
    </div>
  )
}

export default Login
