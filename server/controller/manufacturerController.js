const Manufacturer = require('../models/manufacturerModel');
const Beer = require('../models/beerModel');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find().sort({ name: 1 });
    res.status(200).json(manufacturers);
  } catch (err) {
    console.error('Error fetching manufacturers:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const manufacturer = await Manufacturer.findById(id);
    if (!manufacturer) return res.status(404).json({ message: 'Manufacturer not found' });
    res.status(200).json(manufacturer);
  } catch (err) {
    console.error(`Error fetching manufacturer with id ${id}:`, err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const exists = await Manufacturer.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
    if (exists) {
      return res.status(409).json({ message: 'Manufacturer with that name already exists' });
    }

    const m = new Manufacturer({
      name: name.trim(),
      description: description || '',
      imageUrl: imageUrl || '',
    });

    const saved = await m.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating manufacturer:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, description, imageUrl } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const exists = await Manufacturer.findOne({ 
      name: { $regex: `^${name.trim()}$`, $options: 'i' },
      _id: { $ne: id }
    });
    if (exists) {
      return res.status(409).json({ message: 'Manufacturer with that name already exists' });
    }

    const updated = await Manufacturer.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description || '',
        imageUrl: imageUrl || '',
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Manufacturer not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.error(`Error updating manufacturer with id ${id}:`, err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Beer.countDocuments({ manufacturer: id });
    if (count > 0) {
      return res.status(400).json({ message: 'Cannot delete manufacturer: there are beers assigned to this manufacturer' });
    }

    const deleted = await Manufacturer.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Manufacturer not found' });

    res.status(200).json({ message: 'Manufacturer deleted' });
  } catch (err) {
    console.error('Error deleting manufacturer:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

