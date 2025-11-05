const User = require("../models/User");

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("cart.beer");
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { beerId, quantity } = req.body;

    const user = await User.findById(userId);
    const existingItem = user.cart.find(item => item.beer.toString() === beerId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ beer: beerId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { beerId } = req.body;

    const user = await User.findById(userId);
    user.cart = user.cart.filter(item => item.beer.toString() !== beerId);

    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};