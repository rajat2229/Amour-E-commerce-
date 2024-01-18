import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  logout,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
  addNewsletter,
  allNewsletters,
  getWishlist,
  addWishlist,
  removeWishlist,
} from "../controllers/userController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

router.route("/newsletter").post(addNewsletter);
router
  .route("/newsletter/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allNewsletters);

router
  .route("/wishlist")
  .get(isAuthenticatedUser, getWishlist)
  .post(isAuthenticatedUser, addWishlist);

router.route("/wishlist/:id").delete(isAuthenticatedUser, removeWishlist);

export default router;
