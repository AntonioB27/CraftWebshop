const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },      // npr. u HRK
  abv: { type: Number },                         // postotak alkohola
  color: { type: String },                       // npr. zlatna, tamna, jantarna
  type: { type: String },                        // IPA, lager, stout, porter, itd.
  volume: { type: Number, default: 500 },        // ml
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  description: { type: String },
  imageUrl: { type: String },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;