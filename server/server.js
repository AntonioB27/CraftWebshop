const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "localhost:27017/CraftWebshop";

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL, {}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

const apiRouter = express.Router();
apiRouter.use('/users', userRoute);

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});