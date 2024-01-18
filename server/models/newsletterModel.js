import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please enter a valid email address",
      ],
    },
  },
  { timestamps: true }
);

const Newsletter = mongoose.model("Newsletter", newsletterSchema);
export default Newsletter;
