const express = require('express');
const router = express.Router();
const { getAll } = require('../controller/beerController');

router.get('/', getAll);

module.exports = router;