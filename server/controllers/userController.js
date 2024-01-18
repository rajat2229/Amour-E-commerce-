// Import DB Models
import User from "../models/userModel.js";
import Wishlist from "../models/wishlistModel.js";
import Newsletter from "../models/newsletterModel.js";

// Import Aync Error Handler Middleware
import catchAyncErrors from "../middleware/catchAyncErrors.js";

// Import Utils
import sendToken from "../utils/jwtToken.js";
import { sendResetPasswordEmail } from "../utils/customEmail.js";
import ErrorHandler from "../utils/errorHandler.js";

// Register a user -- Public

export const registerUser = catchAyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});

// Login user -- Public

export const loginUser = catchAyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  // Finding user in database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

// Logout user -- Public

export const logout = catchAyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Forgot password -- Public

export const forgotPassword = catchAyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  await sendResetPasswordEmail(user.email, resetToken);

  res.status(200).json({
    success: true,
    message: `Email sent to: ${user.email} successfully`,
  });
});

// Reset password -- Public

export const resetPassword = catchAyncErrors(async (req, res, next) => {
  const resetPasswordToken = req.body.resetPasswordOtp;
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Password reset OTP is invalid or has expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  // Setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// Get currently logged in user details -- Private

export const getUserProfile = catchAyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update / Change password -- Private

export const updatePassword = catchAyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  // check if old password and new password are same
  if (req.body.oldPassword === req.body.newPassword) {
    return next(
      new ErrorHandler("New password cannot be same as old password", 400)
    );
  }

  // check if new password and confirm password are same

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Update user profile -- Private

export const updateProfile = catchAyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    postalCode: req.body.postalCode,
  };
  // Update avatar: TODO
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

// Get all users -- Admin

export const allUsers = catchAyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user details -- Admin

export const getUserDetails = catchAyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Update user role -- Admin
export const updateUserRole = catchAyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
  });
});

// Delete user -- Admin

export const deleteUser = catchAyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// Newsletter Signup Email -- Public

export const addNewsletter = catchAyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const ourNewsletter = await Newsletter.findOne({ email });
  if (ourNewsletter) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  await Newsletter.create({
    email,
  });
  res.status(200).json({
    success: true,
    message: "Newsletter Signup completed successfully",
  });
});

// Get all Newsletter signups -- Admin

export const allNewsletters = catchAyncErrors(async (req, res, next) => {
  const newsletters = await Newsletter.find();
  res.status(200).json({
    success: true,
    newsletters,
  });
});

// Add wishlist -- Private

export const addWishlist = catchAyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 404));
  }
  const wishlist = await Wishlist.findOne({ user: user._id });
  if (wishlist) {
    const isProductExist = wishlist.products.find(
      (product) => product._id == req.body.productId
    );
    if (isProductExist) {
      return next(new ErrorHandler("Product already exist in wishlist", 400));
    }

    const newProduct = req.body.productId;

    wishlist.products.push(newProduct);
    await wishlist.save();
    const populatedWishlist = await Wishlist.findById(wishlist._id).populate(
      "products",
      "name price images"
    );
    return res.status(200).json({
      success: true,
      wishlist: populatedWishlist,
    });
  }

  const newProduct = req.body.productId;

  const newWishlist = await Wishlist.create({
    user: user._id,
    products: [newProduct],
  });

  await newWishlist.save();

  const populatedWishlist = await Wishlist.findById(newWishlist._id).populate(
    "products",
    "name price images"
  );

  res.status(200).json({
    success: true,
    wishlist: populatedWishlist,
  });
});

// Get wishlist -- Private

export const getWishlist = catchAyncErrors(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
    "products",
    "name price images"
  );
  if (!wishlist) {
    return next(new ErrorHandler("Wishlist not found", 404));
  }
  res.status(200).json({
    success: true,
    wishlist,
  });
});

// Remove wishlist -- Private

export const removeWishlist = catchAyncErrors(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id });
  if (!wishlist) {
    return next(new ErrorHandler("Wishlist not found", 404));
  }
  const product = req.params.id;
  const index = wishlist.products.indexOf(product);

  if (index === -1) {
    return next(new ErrorHandler("Product not found in wishlist", 404));
  }

  wishlist.products.splice(index, 1);
  await wishlist.save();
  const newWishlist = await Wishlist.findOne({ user: req.user.id }).populate(
    "products",
    "name price images"
  );
  res.status(200).json({
    success: true,
    wishlist: newWishlist,
  });
});
