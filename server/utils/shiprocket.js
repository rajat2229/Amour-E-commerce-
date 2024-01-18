import axios from "axios";
import { dateFromTimestamp } from "./dateConverter.js";

// Gererate Token from Shiprocket in every 9 days

export const generateToken = async () => {
  const data = JSON.stringify({
    email: "amourapi@gmail.com",
    password: "4T#Mb6.@x3L.f3h",
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://apiv2.shiprocket.in/v1/external/auth/login",
    headers: {
      "Content-Type": "application/json",
    },

    data: data,
  };

  const response = await axios(config);

  return response.data.token;
};

export const createOrder = async (order) => {
  const token = await generateToken();

  const data = JSON.stringify({
    order_id: order._id,
    order_date: `${dateFromTimestamp(order.createdAt)}`,
    pickup_location: "JALANDHAR",
    billing_customer_name: order.shippingInfo.name,
    billing_last_name: " ",
    billing_address: order.shippingInfo.address,
    billing_city: order.shippingInfo.city,
    billing_pincode: order.shippingInfo.pinCode,
    billing_state: order.shippingInfo.state,
    billing_country: order.shippingInfo.country,
    billing_email: order.shippingInfo.email,
    billing_phone: order.shippingInfo.phoneNo,
    shipping_is_billing: true,
    order_items: order.orderItems.map((item) => {
      return {
        name: item.product.name,
        sku: item.product._id,
        units: item.quantity,
        selling_price: item.product.price,
      };
    }),
    payment_method: order.paymentMethod === "cod" ? "COD" : "Prepaid",
    sub_total: order.totalPrice,
    length: 36,
    breadth: 24,
    height: 2.5,
    weight: 0.5,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  await axios(config);
};
