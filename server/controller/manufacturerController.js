const Manufacturer = require('../models/manufacturerModel');

exports.getAll = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.find(); 
        res.status(200).json(manufacturer);
    } catch (error) {
        console.error('Error fetching beers:', error);
        res.status(500).json({ messsage: 'Internal Server Error' });
    }
};

