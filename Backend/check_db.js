const mongoose = require("mongoose");
const Car = require("./Models/Cars");
const User = require("./Models/User");
const Order = require("./Models/Order");
require("dotenv").config();

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/Ecommerce");
    console.log("--- MongoDB Status Report ---");
    console.log("Connected to:", mongoose.connection.name);
    
    const carCount = await Car.countDocuments();
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    
    console.log(`Cars in collection: ${carCount}`);
    console.log(`Users in collection: ${userCount}`);
    console.log(`Orders in collection: ${orderCount}`);
    
    if (carCount > 0) {
      const sampleCars = await Car.find().limit(3);
      console.log("\nSample Cars:");
      sampleCars.forEach(car => {
        console.log(`- ${car.brand} ${car.name} (Price: ₹${car.price})`);
      });
    }
    
    process.exit(0);
  } catch (err) {
    console.error("Failed to check MongoDB:", err);
    process.exit(1);
  }
}

checkDB();
