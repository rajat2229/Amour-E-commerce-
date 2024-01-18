import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getRecommendedProducts,
  getOneProductFromEachCategory,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/recommended").get(getRecommendedProducts);
router.route("/products/explore").get(getOneProductFromEachCategory);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);
router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
export default router;
