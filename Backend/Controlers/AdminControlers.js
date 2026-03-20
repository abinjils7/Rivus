const User = require("../Models/User");
const Order = require("../Models/Order");
const Car = require("../Models/Cars");
const Product = require("../Models/Cars");

const fetchuser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ messege: "erorr happend" });
  }
};

const fetchOrder = async (req, res) => {
  try {
    console.log("got a fetchoder request");
    const orders = await Order.find().populate("items.productId");
    res.status(200).json(orders);
    console.log("sending to frontend", orders);
  } catch (error) {
    res.status(400).json({ messege: "erorr happend" });
  }
};

const addCar = async (req, res) => {
  try {
    const car = await Car.insertMany(req.body);
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Error adding car", error });
  }
};

const removeCar = async (req, res) => {
  try {
    const { productId } = req.body;
    const car = await Car.findByIdAndDelete(productId); // ✅ pass ID directly

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing car", error });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log("received for status update:", id, status);

    if (!id || !status) {
      console.error("Missing id or status in payload:", req.body);
      return res.status(400).json({ message: "id and status are required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      console.error("Order not found for id:", id);
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Server error on update:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const blockUser = async (req, res) => {
  try {
    const { _id, status } = req.body;
    console.log("Received PATCH for user state:", { _id, status });

    if (!_id || typeof status === "undefined") {
      return res.status(400).json({ message: "Missing user ID or status" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User status updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user status:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const removeUser = async (req, res) => {
  const { userId } = req.body;

  console.log("user is recevde for delet ", userId);

  try {
    if (!userId) {
      return res.status(404).json({ message: "user not found" });
    }
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user deleted", deletedUser });
  } catch (error) {
    console.log("Error happened while deleting user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Example Express backend controller for PATCH /Admin/product/:id

const editProduct = async (req, res) => {
  try {
    const { _id, ...updateFields } = req.body;
    console.log("Received product update:", req.body);

    if (!_id) {
      return res.status(400).json({ message: "Product ID (_id) required" });
    }
    if (!Object.keys(updateFields).length) {
      return res.status(400).json({ message: "No fields for update provided" });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(_id, updateFields, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  fetchuser,
  fetchOrder,
  blockUser,
  changeOrderStatus,
  addCar,
  removeCar,
  removeUser,
  editProduct,
};
