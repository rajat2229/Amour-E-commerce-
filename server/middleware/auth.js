// Import the required modules
import jwt from "jsonwebtoken";
// Import DB Models
import User from "../models/userModel.js";
// Import Aync Error Handler Middleware
import catchAyncErrors from "./catchAyncErrors.js";
// Import Utils
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticatedUser = catchAyncErrors(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
