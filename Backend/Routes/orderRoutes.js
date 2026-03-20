const express = require("express");
const { getOrders, createOrder } = require("../Controlers/OrderControlers");
const auth = require("../Middlewares/AuthMiddleware");
const router = express.Router();

router.get("/:userId", getOrders);

router.post("/", auth, createOrder);

module.exports = router;
