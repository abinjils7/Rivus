const express = require("express");
const app = require("../Backend/Server");

// Wrap the Express app so that /api/cars → app sees /cars
const handler = express();
handler.use("/api", app);

module.exports = handler;
