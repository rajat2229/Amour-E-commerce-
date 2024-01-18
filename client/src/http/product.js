import api from "./api";



export async function fetchAllProducts() {
  try {
    const res = await api.get("/products/");
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}
export async function getExploreProducts() {
  try {
    const res = await api.get("/products/explore");
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}


export async function singleProduct(id) {
  try {
    const res = await api.get("/product/" + id);
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}

export async function recommndedProducts() {
  try {
    const res = await api.get("/products/recommended/");
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}


export async function createReview(productId,rating,comment){
  const token = JSON.parse(localStorage.getItem("WEB_APP"));
  try {
    const res = await api.put("/review",{
      productId,
      comment,
      rating
    },{
      headers:{token}
    });
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}