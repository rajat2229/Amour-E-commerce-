import express from "express";
import { getStats, contactForm } from "../controllers/utilsController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/stats")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getStats);

router.route("/contact").post(contactForm);

export default router;
