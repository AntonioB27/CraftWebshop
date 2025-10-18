const express = require('express');
const router = express.Router();
const { create, login, fetch, getUserById } = require('../controller/userController');

router.post('/create', create);
router.get('/fetch', fetch); 
router.post('/login', login);
router.get('/:id', getUserById); 

module.exports = router;