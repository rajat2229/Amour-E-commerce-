import api from "./api";



export const LoginUser = async(email,password)=>{
  try {
    const res = await api.post("/login",{
      email:email,
      password:password
    })
    return res.data;
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}


export const RegisterUser = async (name,email,password)=>{
  try {
    const res = await api.post("/register",{
      name:name,
      email:email,
      password:password,
    })
    return res.data;
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}


export const ForgotUser = async(email)=>{
  try {
    const res = await api.post("/password/forgot",{
      email
    });
    return res.data
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}
export const ResetUser = async(password,confirmPassword,resetPasswordOtp)=>{
  try {
    const res = await api.put("/password/reset/",{
      password,
      confirmPassword,
      resetPasswordOtp
    });
    return res.data
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}


