import api from "./api";



export const ContactForm = async(name,email,msg)=>{
  try {
    const res = await api.post("/contact",{
      name,
      email,
      message:msg
    })
    return res.data;
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}

export const NewsLetterForm = async(email)=>{
  try {
    const res = await api.post("/newsletter",{
      email
    })
    return res.data;
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}
