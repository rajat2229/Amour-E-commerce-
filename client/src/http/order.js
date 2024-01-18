import api from "./api";


export const newOrder = async (shippingInfo, paymentMethod) => {
  const token = JSON.parse(localStorage.getItem("WEB_APP"));
  const data = JSON.parse(localStorage.getItem("cart"));

  const orderItems = [];
  data.map((item, key) => {
    const obj = {
      product: item?._id,
      quantity: item?.quantity,
      size: item?.size
    }
    orderItems.push(obj);
  })
  try {
    const res = await api.post("/order/new", {
      // All data here
      shippingInfo,
      orderItems,
      paymentMethod
    },
      {
        headers: { token: token }
      }
    )
    console.log(res);
    // if (res.data.method === 'cod')
      return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}



export const getOrders = async () => {
  const token = JSON.parse(localStorage.getItem("WEB_APP"));
  try {
    const res = await api.get("/orders/me",
      {
        headers: { token: token }
      }
    )
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}



export const getOrderDetail = async (id) => {
  const token = JSON.parse(localStorage.getItem("WEB_APP"));
  try {
    const res = await api.get("/order/" + id,
      {
        headers: { token: token }
      }
    )
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}