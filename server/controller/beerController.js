const Beer = require('../models/beerModel');
const Manufacturer = require('../models/manufacturerModel');
const mongoose = require('mongoose');

exports.getAll = async (req, res) => {
    try {
        const beers = await Beer.find().populate('manufacturer');
        res.status(200).json(beers);
    } catch (error) {
        console.error('Error fetching beers:', error);
        res.status(500).json({ messsage: 'Internal Server Error' });
    }
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const beer = await Beer.findById(id).populate('manufacturer');
        if (!beer) {
            return res.status(404).json({ message: 'Beer not found' });
        }
        res.status(200).json(beer);
    } catch (error) {
        console.error(`Error fetching beer with id ${id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createBeer = async (req, res) => {
    try {
        if (req.body.manufacturer) {
            const mVal = req.body.manufacturer;
            if (mongoose.Types.ObjectId.isValid(mVal)) {
                const exists = await Manufacturer.findById(mVal);
                if (!exists) return res.status(400).json({ message: 'Manufacturer not found' });
                req.body.manufacturer = exists._id;
            } else if (typeof mVal === 'string') {
                let m = await Manufacturer.findOne({ name: { $regex: `^${mVal}$`, $options: 'i' } });
                if (!m) {
                    m = new Manufacturer({ name: mVal });
                    await m.save();
                }
                req.body.manufacturer = m._id;
            } else {
                return res.status(400).json({ message: 'Invalid manufacturer value' });
            }
        }

        const newBeer = new Beer(req.body);
        const savedBeer = await newBeer.save();
        const populated = await Beer.findById(savedBeer._id).populate('manufacturer');
        res.status(201).json(populated);
    } catch (error) {
        console.error('Error creating beer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateBeer = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.manufacturer) {
            const mVal = req.body.manufacturer;
            if (mongoose.Types.ObjectId.isValid(mVal)) {
                const exists = await Manufacturer.findById(mVal);
                if (!exists) return res.status(400).json({ message: 'Manufacturer not found' });
                req.body.manufacturer = exists._id;
            } else if (typeof mVal === 'string') {
                let m = await Manufacturer.findOne({ name: { $regex: `^${mVal}$`, $options: 'i' } });
                if (!m) {
                    m = new Manufacturer({ name: mVal });
                    await m.save();
                }
                req.body.manufacturer = m._id;
            } else {
                return res.status(400).json({ message: 'Invalid manufacturer value' });
            }
        }

        const updatedBeer = await Beer.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        }).populate('manufacturer');

        if (!updatedBeer) return res.status(404).json({ message: 'Beer not found' });
        res.status(200).json(updatedBeer);
    } catch (error) {
        console.error(`Error updating beer with id ${id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteBeer = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBeer = await Beer.findByIdAndDelete(id);
        if (!deletedBeer) {
            return res.status(404).json({ message: 'Beer not found' });
        }
        res.status(200).json({ message: 'Beer deleted successfully' });
    } catch (error) {
        console.error(`Error deleting beer with id ${id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
