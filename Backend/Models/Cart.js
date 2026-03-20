const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car", // or "Product" if you have a Product model
      required: [true, "Product reference is required"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
