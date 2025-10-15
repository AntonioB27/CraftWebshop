import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "localhost:27017/CraftWebshop";

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
    console.log('Server is running on http://localhost:5000');
});
});

const app = express();

app.get('/api', (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]});
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

