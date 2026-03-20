const express = require("express");
const {
  deleteCartItem,
  addCartItem,
  getUserCartItems,
  updateQuantity,
  clearCart,
} = require("../Controlers/CartControler");
const router = express.Router();

router.post("/", addCartItem);

router.get("/:userId", getUserCartItems);

router.delete("/", deleteCartItem);

router.put("/", updateQuantity);

router.delete("/clear-cart", clearCart);

module.exports = router;
