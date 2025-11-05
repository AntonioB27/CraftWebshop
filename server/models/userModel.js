const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beer",
  }],
  cart: [{
    beer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beer",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;