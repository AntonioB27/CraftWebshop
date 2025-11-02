const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { getAll, getById, create, delete: deleteManufacturer } = require('../controller/manufacturerController');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', auth, admin, create);
router.delete('/:id', auth, admin, deleteManufacturer);

module.exports = router;