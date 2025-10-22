const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/CraftWebshop';

const Manufacturer = require('../models/manufacturerModel');
const Beer = require('../models/beerModel');

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);

    await Beer.deleteMany({});
    await Manufacturer.deleteMany({});

    const manufacturersData = [
      {
        name: 'Pivovara Medvedgrad',
        founded: 1994,
        country: 'Hrvatska',
        description: 'Poznata hrvatska craft pivovara s naglaskom na tradicionalne i eksperimentalne stilove.',
        logoUrl: 'http://localhost:5000/static/images/medvedgrad.png',
      },
      {
        name: 'Pivovara Zadruga',
        founded: 2010,
        country: 'Hrvatska',
        description: 'Manja zanatska pivovara poznata po voćnim i kiselkastim pivima.',
        logoUrl: 'http://localhost:5000/static/images/zadruga.png',
      },
      {
        name: 'Pivovara Brlog',
        founded: 2016,
        country: 'Hrvatska',
        description: 'Eksperimentalna pivovara fokusirana na IPA i tamne stilove.',
        logoUrl: 'http://localhost:5000/static/images/brlog.png',
      },
      {
        name: 'Pivovara Nova Runda',
        founded: 2018,
        country: 'Hrvatska',
        description: 'Moderan craft brend sa širokim asortimanom — od pilsnera do sour piva.',
        logoUrl: 'http://localhost:5000/static/images/nova-runda_.png',
      },
    ];

    const manufacturers = await Manufacturer.insertMany(manufacturersData);

    const m = {};
    manufacturers.forEach((man) => { m[man.name] = man._id; });

    const beersData = [
      {
        name: 'Zlatni IPA',
        priceHrk: 28,
        priceEur: 3.99,
        abv: 6.5,
        color: 'zlatna',
        type: 'IPA',
        volume: 500,
        manufacturer: m['Pivovara Brlog'],
        description: 'Aromatičan IPA s izraženim tropskim hmeljem i ugodnom gorčinom.',
        imageUrl: 'http://localhost:5000/static/images/beers/1.jpg',
      },
      {
        name: 'Tamni Brlog Stout',
        priceHrk: 32,
        priceEur: 4.49,
        abv: 7.2,
        color: 'tamna',
        type: 'Stout',
        volume: 500,
        manufacturer: m['Pivovara Brlog'],
        description: 'Bogati stout s notama kave i tamne čokolade.',
        imageUrl: 'http://localhost:5000/static/images/beers/5.jpg',
      },
      {
        name: 'Medved Sveži Pils',
        priceHrk: 22,
        priceEur: 3.19,
        abv: 5.0,
        color: 'svijetla',
        type: 'Pilsner',
        volume: 500,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Klasični pilsner s čistim i svježim završetkom.',
        imageUrl: 'http://localhost:5000/static/images/beers/9.jpg',
      },
      {
        name: 'Medved Amber Ale',
        priceHrk: 26,
        priceEur: 3.66,
        abv: 5.8,
        color: 'jantarna',
        type: 'Amber Ale',
        volume: 500,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Komentar karameliziranih slada i blage citrusne note.',
        imageUrl: 'http://localhost:5000/static/images/beers/13.jpg',
      },
      {
        name: 'Zadruga Voćni Sour',
        priceHrk: 30,
        priceEur: 4.33,
        abv: 4.5,
        color: 'roza',
        type: 'Sour',
        volume: 375,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Kiselkasto-voćni sour s prirodnim okusom maline.',
        imageUrl: 'http://localhost:5000/static/images/beers/17.jpg',
      },
      {
        name: 'Zadruga Svetlo Pšenično',
        priceHrk: 24,
        priceEur: 3.99,
        abv: 5.2,
        color: 'svijetla',
        type: 'Wheat',
        volume: 500,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Lagano pšenično pivo, osvježavajuće s notama banane i klinčića.',
        imageUrl: 'http://localhost:5000/static/images/beers/2.jpg'
      },
      {
        name: 'Nova Runda Session IPA',
        priceHrk: 25,
        priceEur: 4.22,
        abv: 4.2,
        color: 'zlatna',
        type: 'Session IPA',
        volume: 440,
        manufacturer: m['Pivovara Nova Runda'],
        description: 'Lagana, ali aromatična IPA za cijeli večernji pivski užitak.',
        imageUrl: 'http://localhost:5000/static/images/beers/6.jpg',
      },
      {
        name: 'Nova Runda Doppelbock',
        priceHrk: 34,
        priceEur: 5.66,
        abv: 8.0,
        color: 'tamno-žuta',
        type: 'Doppelbock',
        volume: 500,
        manufacturer: m['Pivovara Nova Runda'],
        description: 'Punog tijela, slatkast s notama sušenog voća.',
        imageUrl: 'http://localhost:5000/static/images/beers/10.jpg',
      },
      {
        name: 'Brlog Hoppy Pale Ale',
        priceHrk: 27,
        priceEur: 3.95,
        abv: 5.6,
        color: 'zlatna',
        type: 'Pale Ale',
        volume: 500,
        manufacturer: m['Pivovara Brlog'],
        description: 'Biljne i citrusne note hmelja, uravnotežena gorčina.',
        imageUrl: 'http://localhost:5000/static/images/beers/14.jpg',
      },
      {
        name: 'Medved Tamni Porter',
        priceHrk: 29,
        priceEur: 4.11,
        abv: 6.0,
        color: 'tamna',
        type: 'Porter',
        volume: 500,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Gusta tekstura s notama karamele i pržene kave.',
        imageUrl: 'http://localhost:5000/static/images/beers/18.jpg',
      },
      {
        name: 'Zadruga Citrus IPA',
        priceHrk: 28,
        priceEur: 3.99,
        abv: 6.0,
        color: 'zlatna',
        type: 'IPA',
        volume: 500,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Izrazito citrusan profil, idealan uz ljetne obroke.',
        imageUrl: 'http://localhost:5000/static/images/beers/3.jpg',
      },
      {
        name: 'Brlog Black Velvet Stout',
        priceHrk: 36,
        priceEur: 5.20,
        abv: 9.0,
        color: 'crna',
        type: 'Imperial Stout',
        volume: 330,
        manufacturer: m['Pivovara Brlog'],
        description: 'Imperial stout s kompleksnim aromama čokolade i tamnog voća.',
        imageUrl: 'http://localhost:5000/static/images/beers/7.jpg',
      },
      {
        name: 'Nova Runda Saison',
        priceHrk: 26,
        priceEur: 3.66,
        abv: 5.5,
        color: 'zlatna',
        type: 'Saison',
        volume: 500,
        manufacturer: m['Pivovara Nova Runda'],
        description: 'Suho i začinjeno, odličan uz sireve i uz roštilj.',
        imageUrl: 'http://localhost:5000/static/images/beers/11.jpg',
      },
      {
        name: 'Medved Klasik Lager',
        priceHrk: 20,
        priceEur: 2.80,
        abv: 4.8,
        color: 'svijetla',
        type: 'Lager',
        volume: 500,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Tradicionalni lager, lagan i osvježavajuć.',
        imageUrl: 'http://localhost:5000/static/images/beers/15.jpg',
      },
      {
        name: 'Zadruga Čoko Milk Stout',
        priceHrk: 31,
        priceEur: 4.30,
        abv: 6.3,
        color: 'crna',
        type: 'Milk Stout',
        volume: 500,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Slatkast stout s dodatkom mliječnog šećera i podtonom čokolade.',
        imageUrl: 'http://localhost:5000/static/images/beers/19.jpg',
      },
      {
        name: 'Brlog Red Ale',
        priceHrk: 27,
        priceEur: 3.60,
        abv: 5.9,
        color: 'crvena',
        type: 'Red Ale',
        volume: 500,
        manufacturer: m['Pivovara Brlog'],
        description: 'Kombinacija karamele i lagane citrusne gorčine.',
        imageUrl: 'http://localhost:5000/static/images/beers/4.jpg',
      },
      {
        name: 'Nova Runda Berry Sour',
        priceHrk: 33,
        priceEur: 4.80,
        abv: 4.0,
        color: 'crvena',
        type: 'Fruit Sour',
        volume: 375,
        manufacturer: m['Pivovara Nova Runda'],
        description: 'Kiselo-voćni napitak s intenzivnim notama bobičastog voća.',
        imageUrl: 'http://localhost:5000/static/images/beers/8.jpg',
      },
      {
        name: 'Medved Hazy IPA',
        priceHrk: 29,
        priceEur: 3.66,
        abv: 6.8,
        color: 'mutna-zlatna',
        type: 'Hazy IPA',
        volume: 440,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Neprozoran, tropski aromatičan i vrlo pitak.',
        imageUrl: 'http://localhost:5000/static/images/beers/12.jpg',
      },
      {
        name: 'Zadruga Session Lager',
        priceHrk: 40,
        priceEur: 6.00,
        abv: 4.0,
        color: 'svijetla',
        type: 'Session Lager',
        volume: 500,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Lagan lager s naglaskom na osvježavajuću pitičnost.',
        imageUrl: 'http://localhost:5000/static/images/beers/16.jpg',
      },
      {
        name: 'Brlog Barrel Aged Ale',
        priceHrk: 45,
        priceEur: 6.35,
        abv: 10.2,
        color: 'jantarna',
        type: 'Barrel Aged Ale',
        volume: 330,
        manufacturer: m['Pivovara Brlog'],
        description: 'Složeno pivo odležano u bačvama s izraženim drvenim notama.',
        imageUrl: 'http://localhost:5000/static/images/beers/20.jpg',
      },
    ];

    const createdBeers = await Beer.insertMany(beersData);

    await mongoose.disconnect();
    console.log('Seeding beers and manufacturers completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error while seeding:', err);
    process.exit(1);
  }
}

seed();