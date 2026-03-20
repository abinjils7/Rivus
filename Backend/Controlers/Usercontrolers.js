const User = require("../Models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};

const userViewprofile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ userId });
    if (!user) res.status(404).json({ messege: "no users found" });
    res.status(201).json({ message: `welcome ${user.name}`, data: user });
  } catch (eroor) {}
};

module.exports = { getUsers, addUser, userViewprofile };
