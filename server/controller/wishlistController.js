const User = require('../models/userModel');
const Beer = require('../models/beerModel');

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'wishlist',
      populate: { path: 'manufacturer' }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.wishlist || []);
  } catch (e) {
    console.error('Wishlist get error:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { beerId } = req.body;
    if (!beerId) return res.status(400).json({ message: 'Beer ID required' });
    const beer = await Beer.findById(beerId);
    if (!beer) return res.status(404).json({ message: 'Beer not found' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.wishlist.some(id => id.toString() === beerId)) {
      user.wishlist.push(beerId);
      await user.save();
    }
    const populated = await User.findById(req.user.id).populate({
      path: 'wishlist',
      populate: { path: 'manufacturer' }
    });
    res.status(200).json(populated.wishlist);
  } catch (e) {
    console.error('Wishlist add error:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { beerId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.wishlist = user.wishlist.filter(id => id.toString() !== beerId);
    await user.save();
    const populated = await User.findById(req.user.id).populate({
      path: 'wishlist',
      populate: { path: 'manufacturer' }
    });
    res.status(200).json(populated.wishlist);
  } catch (e) {
    console.error('Wishlist remove error:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.wishlist = [];
    await user.save();
    res.status(200).json({ message: 'Wishlist cleared', wishlist: [] });
  } catch (e) {
    console.error('Wishlist clear error:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};