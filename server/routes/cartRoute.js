const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controller/cartController');

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.put('/update/:beerId', auth, updateCartItem);
router.delete('/remove/:beerId', auth, removeFromCart);
router.delete('/clear', auth, clearCart);

module.exports = router;