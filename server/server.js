const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const beerRoute = require('./routes/beerRoute');
const manufacturerRoute = require('./routes/manufacturerRoute')
const path = require('path');

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "localhost:27017/CraftWebshop";

const app = express();

app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'static')));

mongoose.connect(MONGO_URL, {}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use('/users', userRoute);
apiRouter.use('/beers', beerRoute);
apiRouter.use('/manufacturers', manufacturerRoute)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});