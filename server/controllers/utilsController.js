// Import DB Models
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import newsletter from "../models/newsletterModel.js";
// Import Aync Error Handler Middleware
import catchAyncErrors from "../middleware/catchAyncErrors.js";
// Import Utils
import sendEmail from "../utils/sendEmail.js";

// Get stats -- Admin

export const getStats = catchAyncErrors(async (req, res, next) => {
  const usersCount = await User.countDocuments();
  const productsCount = await Product.countDocuments();
  const ordersCount = await Order.countDocuments();
  const newsletterCount = await newsletter.countDocuments();
  res.status(200).json({
    success: true,
    usersCount,
    productsCount,
    ordersCount,
    newsletterCount,
  });
});

// Handle Contact Form

export const contactForm = catchAyncErrors(async (req, res, next) => {
  const { name, email, message } = req.body;
  const appName = process.env.APP_NAME;
  await sendEmail({
    email: process.env.EMAIL_ADMIN,
    subject: `Contact Form - ${appName}`,
    message: `
        <h1>Contact Form</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
  });

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
  });
});
