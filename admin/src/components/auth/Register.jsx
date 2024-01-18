import React, { useContext, useState } from 'react'
import { RegisterUser } from '../../http/auth'
import Button from '../Button/Button'
import InputBox from '../Input/InputBox'
import { toast } from "react-toastify"
import CheckEmail from '../../utility/CheckEmail'
import { AuthContext } from '../../Context/userContext'
const Register = ({closeModal}) => {
  const {setUser} = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: '',
    password: "",
    confirmPassword: ''
  })
  const { name, email, password, confirmPassword } = userInfo;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (name === "" && email === "" && password === "" && confirmPassword === "") {
      toast.error("Please enter all fields");
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
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    const value = await RegisterUser(name, email, password, confirmPassword);
    if(value.code === "ERR_NETWORK"){
      toast.error("Some error occured");
      return;
    }
    if (!value.success) {
      toast.error("Email already registered");
    }
    else {
      toast.success("Register successfully");
      localStorage.setItem("WEB_APP", JSON.stringify(value.token));
      setUser(value.token)
      setUserInfo({
        name: "",
        email: '',
        password: "",
        confirmPassword: ''
      })
      closeModal();
    }
  }
  return (
    <div className='flex flex-col gap-5'>
      <InputBox
        placeholder={"Full Name"}
        name="name"
        value={name}
        handleChange={handleChange}
      />
      <InputBox
        placeholder={"Email"}
        name="email"
        value={email}
        handleChange={handleChange}
      />
      <InputBox
        placeholder={"Password"}
        type="password"
        name="password"
        value={password}
        handleChange={handleChange}
      />
      <InputBox
        placeholder={"Confirm Password"}
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        handleChange={handleChange}
      />
      <Button
        title="Register"
        className={"w-full"}
        style={{borderRadius:0}}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Register
