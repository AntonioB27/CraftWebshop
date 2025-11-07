const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getWishlist, addToWishlist, removeFromWishlist, clearWishlist } = require('../controller/wishlistController');

router.get('/', auth, getWishlist);
router.post('/add', auth, addToWishlist);
router.delete('/remove/:beerId', auth, removeFromWishlist);
router.delete('/clear', auth, clearWishlist);

module.exports = router;