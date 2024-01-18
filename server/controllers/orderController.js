// Import DB Models
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Import Aync Error Handler Middleware
import catchAyncErrors from "../middleware/catchAyncErrors.js";

// Import Utils
import ErrorHandler from "../utils/errorHandler.js";
import { createOrder } from "../utils/shiprocket.js";
import { sendOrderEmail, sendAdminOrderEmail } from "../utils/customEmail.js";
import { encrypt, decrypt } from "../utils/cipher.js";
import qs from "querystring";

// Create new order -- Public
export const newOrder = catchAyncErrors(async (req, res, next) => {
  if (!req.body.shippingInfo) {
    return next(new ErrorHandler("Please enter shipping info", 400));
  }

  if (!req.body.orderItems) {
    return next(new ErrorHandler("Please enter order items", 400));
  }

  if (req.body.orderItems.length === 0) {
    return next(new ErrorHandler("Please Add Product", 400));
  }

  if (!req.body.paymentMethod) {
    return next(new ErrorHandler("Please enter payment method", 400));
  }

  // Check if user has saved shipping information

  if (
    req.user.phone === undefined ||
    req.user.address === undefined ||
    req.user.city === undefined ||
    req.user.state === undefined ||
    req.user.postalCode === undefined
  ) {
    req.user.phone = req.body.shippingInfo.phoneNo;
    req.user.address = req.body.shippingInfo.address;
    req.user.city = req.body.shippingInfo.city;
    req.user.state = req.body.shippingInfo.state;
    req.user.postalCode = req.body.shippingInfo.pinCode;
    await req.user.save();
  }

  const productIds = [];

  req.body.orderItems.map((item) => {
    productIds.push(item.product);
  });

  const products = await Product.find({ _id: { $in: productIds } });

  let totalPrice = 0;
  let subTotalPrice = 0;
  let deliveryCharges = 0;

  for (let i = 0; i < products.length; i++) {
    subTotalPrice += products[i].price * req.body.orderItems[i].quantity;
  }

  if (req.body.paymentMethod === "cod") {
    deliveryCharges = 99;
    totalPrice = subTotalPrice + deliveryCharges;
  } else {
    deliveryCharges = 0;
    totalPrice = subTotalPrice + deliveryCharges;
  }

  const order = await Order.create({
    shippingInfo: req.body.shippingInfo,
    orderItems: req.body.orderItems,
    deliveryCharges: deliveryCharges,
    subTotalPrice: subTotalPrice,
    totalPrice: totalPrice,
    paymentMethod: req.body.paymentMethod,
    user: req.user._id,
  });

  await order.save();

  if (order.paymentMethod === "online") {
    // Handle Online Payment Gateway

    let body = {
      merchant_id: process.env.CCAvenue_Merchant_Id,
      order_id: `${order._id}`,
      currency: "INR",
      amount: order.totalPrice,
      redirect_url: process.env.CCAvenue_Redirect_Url,
      cancel_url: process.env.CCAvenue_Redirect_Url,
      language: "EN",
      billing_name: order.shippingInfo.name,
      billing_country: order.shippingInfo.country,
      billing_tel: order.shippingInfo.phoneNo,
      billing_email: order.shippingInfo.email,
      billing_address: order.shippingInfo.address,
      billing_city: order.shippingInfo.city,
      billing_state: order.shippingInfo.state,
      billing_zip: order.shippingInfo.pinCode,
    };

    body = qs.stringify(body);

    const workingKey = process.env.CCAVENUE_WORKING_KEY;
    const accessCode = process.env.CCAVENUE_ACCESS_CODE;
    const ccavenueUrl = process.env.CCAVENUE_URL;
    const encRequest = encrypt(body, workingKey);

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      method: "online",
      encRequest,
      accessCode,
      ccavenueUrl,
    });
  } else {
    const populatedOrder = await Order.findById(order._id).populate({
      path: "orderItems.product",
      select: "name price images",
    });

    await sendOrderEmail(populatedOrder);
    await sendAdminOrderEmail(order._id, process.env.EMAIL_ADMIN);
    try {
      await createOrder(populatedOrder);
    } catch (err) {
      console.log(err);
    }

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      method: "cod",
    });
  }
});

// Handle Payment Response

export const handlePaymentResponse = catchAyncErrors(async (req, res, next) => {
  const workingKey = process.env.CCAVENUE_WORKING_KEY;
  const { encResp } = req.body;
  const ccavResponse = qs.parse(decrypt(encResp, workingKey));

  if (ccavResponse.order_status === "Success") {
    const order = await Order.findById(ccavResponse.order_id).populate({
      path: "orderItems.product",
      select: "name price images",
    });

    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

    order.paymentStatus = "completed";
    await order.save();

    await sendOrderEmail(order);
    await sendAdminOrderEmail(order._id, process.env.EMAIL_ADMIN);

    res.redirect(
      `${process.env.CLIENT_URL}/online/payment/success/${ccavResponse.order_id}`
    );
  } else {
    await Order.findByIdAndDelete(ccavResponse.order_id);
    res.redirect(
      `${process.env.CLIENT_URL}/online/payment/failure/${ccavResponse.order_id}`
    );
  }
});

// Get Single Order -- Public

export const getSingleOrder = catchAyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: "orderItems.product",
    select: "name price images",
  });
  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Logged in user Orders -- Public

export const myOrders = catchAyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id }).populate({
    path: "orderItems.product",
    select: "name price images",
  });
  if (!order) {
    return next(new ErrorHandler("No Order found", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// Get All Orders -- Admin

export const getAllOrders = catchAyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    success: true,
    orders,
  });
});

// Update Order Status -- Admin

export const updateOrder = catchAyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: "orderItems.product",
    select: "name price images",
  });
  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  if (order.orderStatus === "Cancelled") {
    return next(new ErrorHandler("You have already cancelled this order", 400));
  }

  if (order.orderStatus === "Confirmed") {
    return next(new ErrorHandler("You have already confirmed this order", 400));
  }

  // Update Order Status & Send Email

  if (req.body.status === "Confirmed") {
    order.orderStatus = "Confirmed";
    await sendOrderEmail(order);
  }

  if (req.body.status === "Cancelled") {
    order.orderStatus = "Cancelled";
    await sendOrderEmail(order);
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    orderStatus: order.orderStatus,
  });
});

// Update Payment Status

export const updatePaymentStatus = catchAyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  if (order.paymentStatus === "completed") {
    return next(new ErrorHandler("Payment Already Completed", 400));
  }

  order.paymentStatus = "completed";

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Payment Completed Successfully",
  });
});

// Delete Order -- Admin

export const deleteOrder = catchAyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
  res.status(200).json({
    success: true,
  });
});
