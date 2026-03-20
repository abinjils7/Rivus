const Wishlist = require("../Models/Wishlist");

const deleteFromWishlist = async (req, res) => {
  try {
    const productid = req.body;
    const deleted = await Wishlist.findOneAndDelete(productid);
    res.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting", error });
  }
};
const getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userid is required" });
    }
    const userwishlist = await Wishlist.find({ userId }).populate("productId");
    if (!userwishlist) {
      res.json({ message: "no wishlist fount on this user " });
      console.log("no wishlist user");
    }
    res.json({ wishlist: userwishlist });
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

const addWishlist = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userid and productid are required" });
    }

    const isInWishlist = await Wishlist.findOne({ productId });
    if (isInWishlist) {
      return res.status(200).json({ message: "Already in wishlist" });
    }

    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();

    res.status(201).json({ message: "Added to wishlist", data: wishlistItem });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({
      message: "Error adding to wishlist",
      error: error.message,
    });
  }
};

module.exports = { deleteFromWishlist, getUserWishlist, addWishlist };
