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
  cart: [{
    beer: { type: mongoose.Schema.Types.ObjectId, ref: 'Beer', required: true },
    quantity: { type: Number, required: true, default: 1, min: 1 }
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;