const express = require('express');
const router = express.Router();
const { getAll } = require('../controller/manufacturerController');

router.get('/', getAll);

module.exports = router;