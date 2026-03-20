const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

const auth = (req, res, next) => {
  const token = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  console.log("auth middleware");

  // If no accessToken and no refreshToken, proceed with no user (unauthenticated)
  if (!token && !refreshToken) {
    console.log("No tokens found. Skipping auth.");
    return next();
  }

  // Try to verify accessToken first, if present
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      console.log("Access token valid:", req.user);
      return next();
    } catch (err) {
      console.log("Access token invalid/expired.");
      // Drop down to refresh token handling
    }
  }

  // If accessToken failed (or missing) but refreshToken exists, try to refresh
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);
      req.user = decoded;
      console.log("Refresh token valid:", decoded);

      // Generate new access token
      const accessToken = jwt.sign(
        { id: decoded.id || decoded.userId }, // pick id from refresh token payload
        JWT_SECRET,
        { expiresIn: "15m" }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      console.log("new acces token provided");
      return next();
    } catch (err) {
      console.log("Invalid refresh token.");
      return res
        .status(401)
        .json({ message: "Unauthorized, invalid refresh token" });
    }
  }

  // Fallback (should never hit here)
  return next();
};

module.exports = auth;
