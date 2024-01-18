import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    fabric: {
      type: String,
      required: [true, "Please enter product fabric"],
    },
    color: {
      type: String,
      required: [true, "Please enter product color"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLenght: [8, "Price cannot exceed 8 figures"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
        required: [true, "Please upload product image"],
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
