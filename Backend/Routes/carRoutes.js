const express = require("express");
// const Car = require("../Models/Cars");
const { getCars, addCar } = require("../Controlers/CarControllers");
const auth = require("../Middlewares/AuthMiddleware");
const isAdmin = require("../Middlewares/adminRolemiddleware");
const router = express.Router();

router.get("/", auth, getCars);

module.exports = router;
