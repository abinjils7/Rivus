const express = require("express");
// const User = require("../Models/User")
const {
  getUsers,
  addUser,
  userViewprofile,
} = require("../Controlers/Usercontrolers");
const auth = require("../Middlewares/AuthMiddleware");
const router = express.Router();

router.get("/", auth, getUsers);

router.post("/", addUser);

router.get("/profile", auth, userViewprofile);

module.exports = router;
