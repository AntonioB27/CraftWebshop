const Beer = require('../models/beerModel');
const Manufacturer = require('../models/manufacturerModel');

exports.getAll = async (req, res) => {
    try {
        const beers = await Beer.find().populate('manufacturer');
        res.status(200).json(beers);
        console.log(beers);
    } catch (error) {
        console.error('Error fetching beers:', error);
        res.status(500).json({ messsage: 'Internal Server Error' });
    }
};

