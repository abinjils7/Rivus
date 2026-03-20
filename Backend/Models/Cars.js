const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  hp: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Car", carSchema);
