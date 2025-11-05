const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart } = require('../controller/cartController');
const { auth } = require('../middleware/authMiddleware');

router.post('/add', auth, addToCart);
router.post('/remove', auth, removeFromCart);
router.get('/', auth, getCart);

module.exports = router;