const mongoose = require("mongoose");

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI environment variable is not set");
    await mongoose.connect(uri);
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    // Don't process.exit(1) in serverless, let the function fail
    if (require.main === module) {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDb;
