const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/CraftWebshop';

const users = [
  {
    name: 'Tomislav Trpimirović',
    email: 'prvi.kralj@gmail.com',
    password: bcrypt.hashSync('lozinka123', 10),
    isAdmin: true,
  },
  {
    name: 'Ivan Horvat',
    email: 'ivan.horvat@gmail.com',
    password: bcrypt.hashSync('lozinka123', 10),
  },
  {
    name: 'Ana Kovač',
    email: 'ana.kovac@gmail.com',
    password: bcrypt.hashSync('lozinka123', 10),
  },
  {
    name: 'Marko Perić',
    email: 'marko.peric@gmail.com',
    password: bcrypt.hashSync('lozinka123', 10),
  },
  {
    name: 'Marija Novak',
    email: 'marija.novak@gmail.com',
    password: bcrypt.hashSync('lozinka123', 10),
  },
  {
    name: 'Katarina Matić',
    email: 'katarina.matic@gmail.com',
    password: bcrypt.hashSync('lozinka123', 10),
  },
  {
    name: 'Petar Šimić',
    email: 'petar.simic@gmail.com',
    password: bcrypt.hashSync('lozinka123', 10),
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');

    // WARNING: removes all users in the collection
    await User.deleteMany({});
    console.log('Cleared users collection');

    const created = await User.insertMany(users);
    console.log(`Inserted ${created.length} users`);

    await mongoose.disconnect();
    console.log('Disconnected, seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();