import api from "./api";


export const getOrder = async (id) => {
  (id);
  const token = JSON.parse(localStorage.getItem("WEB_APP_ADMIN"));
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


export const updateOrderStatus = async (status, id) => {
  const token = JSON.parse(localStorage.getItem("WEB_APP_ADMIN"));
  try {
    const res = await api.put(`/admin/order/${id}`,
      {
        status
      },
      {
        headers: { token }
      }
    )
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}
export const updatePaymentStatus = async (status, id) => {
  const token = JSON.parse(localStorage.getItem("WEB_APP_ADMIN"));
  try {
    const res = await api.put(`/admin/order/payment/${id}`,
      {
        status
      },
      {
        headers: { token }
      }
    )
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") return error;
    else return error.response.data;
  }
}