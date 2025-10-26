const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  create,
  login,
  fetch,
  getUserById,
  getAll,
} = require("../controller/userController");

router.post("/create", create);
router.post("/login", login);
router.get("/fetch", auth, fetch);
router.get("/all", auth, admin, getAll);
router.get("/:id", auth, getUserById);

module.exports = router;
