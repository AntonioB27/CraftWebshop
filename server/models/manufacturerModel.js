const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  founded: { type: Number },
  country: { type: String },
  description: { type: String },
  logoUrl: { type: String },
}, { timestamps: true });

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
module.exports = Manufacturer;