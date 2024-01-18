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

