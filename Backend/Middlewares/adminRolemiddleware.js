const isAdmin = (req, res, next) => {
  const isAdmin = (req, res, next) => {
    console.log(req.user, "got foe the checking hte role");
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, only admin!" });
    }
    next();
  };
};

module.exports = isAdmin;
