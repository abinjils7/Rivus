const Car = require("../Models/Cars");

const getCars = async (req, res) => {
  console.log("reached to the car contolers ");
  console.log(req.user);
  try {
    const isAdmin = req.user;
    // console.log("isadmin is ", isAdmin);
    if (isAdmin?.role === "admin") {
      //  (no pagination)
      const cars = await Car.find();
      return res.status(200).json({
        message: "All cars fetched for admin",
        data: cars,
        count: cars.length,
      });
    }
    //  pagination

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const total = await Car.countDocuments();
    const cars = await Car.find().skip(skip).limit(limit);

    return res.status(200).json({
      data: cars,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        count: cars.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cars",
      error: error.message,
    });
  }
};

module.exports = { getCars };

//pagination
//jwt veryfying,refreshtoken
//api ratelimit
//protected route
//cookies
