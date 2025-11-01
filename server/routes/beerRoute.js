const express = require("express");
const router = express.Router();
const { getAll, getById, createBeer, updateBeer, deleteBeer } = require("../controller/beerController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", auth, admin, createBeer);
router.put("/:id", auth, admin, updateBeer);
router.delete("/:id", auth, admin, deleteBeer);

module.exports = router;