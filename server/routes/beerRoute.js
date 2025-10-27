const express = require('express');
const router = express.Router();
const { getAll, getById, createBeer, updateBeer, deleteBeer } = require('../controller/beerController');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createBeer);
router.put('/:id', updateBeer);
router.delete('/:id', deleteBeer);

module.exports = router;