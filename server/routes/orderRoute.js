import express from "express";
import {
  getSingleOrder,
  myOrders,
  newOrder,
  getAllOrders,
  updateOrder,
  updatePaymentStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router
  .route("/admin/order/payment/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePaymentStatus);

export default router;
