import api from "./api"



export const userProfile = async () => {
  const id = JSON.parse(localStorage.getItem("WEB_APP"));
  try {
    const res = await api.get("/me",
    {
      headers:{token:id}
    }
    )
    return res.data;
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}


export const userChangePassword = async(oldPassword,newPassword,confirmPassword)=>{
  try {
    const res = await api.put("/password/update",{
      oldPassword,
      newPassword,
      confirmPassword
    })
    return res.data
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}

export const userProfileUpdate = async(name)=>{
  const id = JSON.parse(localStorage.getItem("WEB_APP"));
  try {
    const res = await api.put("/me/update",{
      name
    },
    {
      headers:{token:id}
    }
    )
    return res.data;
  } catch (error) {
    (error);
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}