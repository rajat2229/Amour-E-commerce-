// Import Required Modules
import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";

// Import Middlewares
import handleError from "./middleware/error.js";

// import Routes
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import utilsRoutes from "./routes/utilsRoute.js";

const app = express();

// Load env vars
if (!fs.existsSync("./.env")) {
  console.log("Creating .env file");
  const src = "../config.txt";
  const dest = "./.env";
  fs.copyFileSync(src, dest);
}

dotenv.config();

// Passing Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fix for CORS issue for ccavenue payment gateway integration

import { handlePaymentResponse } from "./controllers/orderController.js";

app.post("/api/v1/order/payment/response", handlePaymentResponse);

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.ADMIN_URL || origin === process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// API routes

app.get("/", (req, res) => {
  res.json({ message: "Hello from Amour API :)" });
});

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", utilsRoutes);

// Middleware for error handling
app.use(handleError);
app.use((req, res, next) => {
  res.status(404).json({
    message: "Ohh you are lost from Amour API :(",
  });
});

export default app;
