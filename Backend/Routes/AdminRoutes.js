const express = require("express");

const {
  blockUser,
  changeOrderStatus,
  fetchuser,
  fetchOrder,
  addCar,
  removeCar,
  removeUser,
  editProduct,
} = require("../Controlers/AdminControlers");
const isAdmin = require("../Middlewares/adminRolemiddleware");
const auth = require("../Middlewares/AuthMiddleware");

const router = express.Router();

router.get("/", auth, fetchuser);
router.patch("/", auth, changeOrderStatus);
router.patch("/user", auth, blockUser);
router.get("/order", auth, fetchOrder);
router.post("/", auth, addCar);
router.delete("/", auth, removeCar);
router.delete("/user", auth, removeUser);
router.patch("/product", auth, editProduct);

module.exports = router;
