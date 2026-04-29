const express = require("express");

const { Login, register } = require("../Controlers/Auth");
const auth = require("../Middlewares/AuthMiddleware");

const router = express.Router();

router.post("/login", Login);
router.post("/Register", register);

module.exports = router;
