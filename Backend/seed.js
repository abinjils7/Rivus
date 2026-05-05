const mongoose = require("mongoose");
const Car = require("./Models/Cars");
require("dotenv").config();

const seedCars = [
  {
    name: "Model S",
    brand: "Tesla",
    type: "Electric",
    hp: 1020,
    price: 8000000,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "911 Turbo S",
    brand: "Porsche",
    type: "Sports",
    hp: 640,
    price: 25000000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "G-Wagon",
    brand: "Mercedes",
    type: "SUV",
    hp: 577,
    price: 20000000,
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/Ecommerce");
    console.log("Connected to MongoDB for seeding...");
    
    await Car.deleteMany({}); // Clear existing
    await Car.insertMany(seedCars);
    
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
