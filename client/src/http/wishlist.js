import api from "./api";





export async function addWishlist(id){
  const token = JSON.parse(localStorage.getItem("WEB_APP"));
  try {
    const res = await api.post("/wishlist",{
      productId:id
    },
    {
      headers:{token:token}
    }
    )
    return res.data;
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}


export async function fetchWishList(){
  const token = JSON.parse(localStorage.getItem("WEB_APP"));
  try {
    const res = await api.get("/wishlist",{
      headers:{token:token}
    })
    return res.data;
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}
export async function deleteProductFromWishList(id){
  const token = JSON.parse(localStorage.getItem("WEB_APP"));
  try {
    const res = await api.delete("/wishlist/"+id,
    {
      headers:{token:token}
    }
    )
    return res.data;
  } catch (error) {
    if(error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}