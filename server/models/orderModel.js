import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  shippingInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: Number, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "India" },
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
      size: { type: String, required: true },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  deliveryCharges: { type: Number, required: true, default: 0 },
  subTotalPrice: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 },
  orderStatus: {
    type: String,
    required: true,
    default: "Received",
  },
  paymentMethod: { type: String, required: true, default: "cod" },
  paymentStatus: { type: String, required: true, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
