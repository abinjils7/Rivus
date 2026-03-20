const mongoose = require("mongoose");
const Order = require("../Models/Order");

const getOrders = async (req, res) => {
  try {
    console.log("request receved for getorders", req.params);
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate("items.productId");

    res.status(200).json(orders);
    console.log("sending to frontend", orders);
  } catch (error) {
    console.error("[Order][getOrders] Error:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, items, totalQuantity, totalPrice, orderDate, status } =
      req.body;

    // Log incoming request body for debug/review
    console.log("CreateOrder req.body:", req.body);

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Valid userId is required" });
    }

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items in the order" });
    }
    for (const [i, it] of items.entries()) {
      let idToCheck = it.productId;
      if (
        typeof idToCheck === "object" &&
        idToCheck !== null &&
        idToCheck._id
      ) {
        idToCheck = idToCheck._id;
      }
      if (!idToCheck || !mongoose.Types.ObjectId.isValid(idToCheck)) {
        return res
          .status(400)
          .json({ message: `Invalid productId for item ${i + 1}` });
      }
      if (
        typeof it.quantity !== "number" ||
        isNaN(it.quantity) ||
        it.quantity < 1
      ) {
        return res
          .status(400)
          .json({ message: `Invalid quantity for item ${i + 1}` });
      }
    }

    if (
      typeof totalQuantity !== "number" ||
      isNaN(totalQuantity) ||
      totalQuantity < 1
    ) {
      return res
        .status(400)
        .json({ message: "totalQuantity must be a positive number" });
    }
    if (typeof totalPrice !== "number" || isNaN(totalPrice) || totalPrice < 0) {
      return res
        .status(400)
        .json({ message: "totalPrice must be a non-negative number" });
    }

    // Normalize items productId to ObjectId
    const validItems = items.map((it) => ({
      productId:
        typeof it.productId === "string"
          ? new mongoose.Types.ObjectId(it.productId)
          : new mongoose.Types.ObjectId(it.productId._id),
      quantity: it.quantity,
    }));

    // Convert userId to ObjectId for safety
    const validUserId = new mongoose.Types.ObjectId(userId);

    // Create order
    const order = await Order.create({
      userId: validUserId,
      items: validItems,
      totalQuantity,
      totalPrice,
      orderDate: orderDate ? new Date(orderDate) : new Date(),
      status: status && typeof status === "string" ? status : "pending",
    });

    res.status(201).json({
      id: order._id,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while creating order" });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { id, newStatus } = req.body;

    if (!id || !isValidObjectId(id)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid order id." });
    }
    if (!newStatus || typeof newStatus !== "string") {
      return res
        .status(400)
        .json({ message: "Please specify a valid newStatus string." });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }

    order.status = newStatus;
    await order.save();

    res.status(200).json({ message: `Status updated to ${newStatus}`, order });
  } catch (error) {
    console.error("[Order][changeOrderStatus] Error:", error.message);
    res.status(500).json({
      message: "Error updating order status",
    });
  }
};

module.exports = { getOrders, createOrder, changeOrderStatus };
