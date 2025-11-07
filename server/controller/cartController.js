const User = require('../models/userModel');
const Beer = require('../models/beerModel');

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'cart.beer',
      populate: { path: 'manufacturer' }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(user.cart || []);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { beerId, quantity = 1 } = req.body;
    
    if (!beerId) return res.status(400).json({ message: 'Beer ID is required' });
    
    const beer = await Beer.findById(beerId);
    if (!beer) return res.status(404).json({ message: 'Beer not found' });
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const existingItem = user.cart.find(item => item.beer.toString() === beerId);
    
    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      user.cart.push({
        beer: beerId,
        quantity: parseInt(quantity)
      });
    }
    
    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate({
      path: 'cart.beer',
      populate: { path: 'manufacturer' }
    });
    
    res.status(200).json(updatedUser.cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { beerId } = req.params;
    const { quantity } = req.body;
    
    if (quantity < 0) return res.status(400).json({ message: 'Quantity cannot be negative' });
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const cartItem = user.cart.find(item => item.beer.toString() === beerId);
    if (!cartItem) return res.status(404).json({ message: 'Item not found in cart' });
    
    if (quantity === 0) {
      user.cart = user.cart.filter(item => item.beer.toString() !== beerId);
    } else {
      cartItem.quantity = parseInt(quantity);
    }
    
    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate({
      path: 'cart.beer',
      populate: { path: 'manufacturer' }
    });
    
    res.status(200).json(updatedUser.cart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { beerId } = req.params;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.cart = user.cart.filter(item => item.beer.toString() !== beerId);
    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate({
      path: 'cart.beer',
      populate: { path: 'manufacturer' }
    });
    
    res.status(200).json(updatedUser.cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.cart = [];
    await user.save();
    
    res.status(200).json({ message: 'Cart cleared', cart: [] });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};