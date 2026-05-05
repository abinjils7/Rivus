const mongoose = require("mongoose");
require("dotenv").config();

async function listCollections() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections in DB:", collections.map(c => c.name));
    
    for (let col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`- ${col.name}: ${count} documents`);
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

listCollections();
