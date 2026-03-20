require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./DataBase/Db");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();

// Allow localhost in dev and the deployed Vercel URL in production
const allowedOrigins = [
  "http://localhost:5173",
  process.env.ALLOWED_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. mobile apps, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

// Routes
const userRoutes = require("./Routes/userRoutes");
const carRoutes = require("./Routes/carRoutes");
const cartRoutes = require("./Routes/CartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authroutes = require("./Routes/Login");
const wishlistRoutes = require("./Routes/WishlistRoutes");
const AdminRotes = require("./Routes/AdminRoutes");
const { apiLimiter } = require("./apiRatelimiter");

app.use(apiLimiter);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/", authroutes);
app.use("/users", userRoutes);
app.use("/cars", carRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/Admin", AdminRotes);

// Only listen if this file is run directly (not in Vercel/Serverless)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
}

module.exports = app;
