const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priceHrk: { type: Number, required: true },
  priceEur: { type: Number, required: true }, 
  abv: { type: Number },
  color: { type: String },
  type: { type: String },
  volume: { type: Number, default: 500 },
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  description: { type: String },
  imageUrl: { type: String },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;