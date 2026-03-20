const express = require("express");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60000, // time
  max: 120, //100 requests per minit
  standardHeaders: true, // RateLimit headers
  message: {
    status: "error",
    message:
      "wo! wo! to many  requests, please try again later.From api rate limiter",
  },
});

module.exports = { apiLimiter };
