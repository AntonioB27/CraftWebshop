const express = require('express');
const router = express.Router();
const { create, login, fetch } = require('../controller/userController');

router.post('/create', create);
router.get('/fetch', fetch); 
router.post('/login', login);   

module.exports = router;