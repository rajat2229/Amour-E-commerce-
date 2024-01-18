import sendEmail from "./sendEmail.js";
import { getDate } from "./dateConverter.js";
import generateEmail from "./generateEmail.js";
import dotenv from "dotenv";

dotenv.config();

export const sendOrderEmail = async (order) => {
  const orderDate = getDate(order.createdAt);
  const currentDate = getDate(new Date());

  const message = await generateEmail(
    {
      orderStatus: order.orderStatus,
      tprice: order.totalPrice,
      orderNumber: order._id,
      customerName: order.shippingInfo.name,
      address: order.shippingInfo.address,
      city: order.shippingInfo.city,
      state: order.shippingInfo.state,
      pinCode: order.shippingInfo.pinCode,
      orderDate: orderDate,
      currentDate: currentDate,
      orderItems: order.orderItems,
    },
    "order.ejs"
  );

  try {
    await sendEmail({
      email: order.shippingInfo.email,
      subject: `Your Order has been ${order.orderStatus}`,
      message,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendAdminOrderEmail = async (orderId) => {
  try {
    await sendEmail({
      email: process.env.EMAIL_ADMIN,
      subject: `New Order has been placed with order id ${orderId}`,
      message: `
      <p>Dear Admin, <br> <br> A new order has been placed with order id ${orderId}. 
      <br>Please Check the dashboard. <br> Order URL - ${process.env.ADMIN_URL}/order/${orderId} <br>
      Regards, <br/> 
      Team Amour
      <p>
      `,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendResetPasswordEmail = async (userEmail, resetToken) => {
  const message = await generateEmail({ otp: resetToken }, "resetPassword.ejs");
  try {
    await sendEmail({
      email: userEmail,
      subject: "Amour Password Reset OTP",
      message,
    });
  } catch (error) {
    console.log(error);
  }
};
