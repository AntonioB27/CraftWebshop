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
        logoUrl: '../static/images/medvedgrad.png',
      },
      {
        name: 'Pivovara Zadruga',
        founded: 2010,
        country: 'Hrvatska',
        description: 'Manja zanatska pivovara poznata po voćnim i kiselkastim pivima.',
        logoUrl: '../static/images/zadruga.png',
      },
      {
        name: 'Pivovara Brlog',
        founded: 2016,
        country: 'Hrvatska',
        description: 'Eksperimentalna pivovara fokusirana na IPA i tamne stilove.',
        logoUrl: '../static/images/brlog.png',
      },
      {
        name: 'Pivovara Nova Runda',
        founded: 2018,
        country: 'Hrvatska',
        description: 'Moderan craft brend sa širokim asortimanom — od pilsnera do sour piva.',
        logoUrl: '../static/images/nova-runda_.png',
      },
    ];

    const manufacturers = await Manufacturer.insertMany(manufacturersData);

    const m = {};
    manufacturers.forEach((man) => { m[man.name] = man._id; });

    const beersData = [
      {
        name: 'Zlatni IPA',
        price: 28,
        abv: 6.5,
        color: 'zlatna',
        type: 'IPA',
        volume: 500,
        manufacturer: m['Pivovara Brlog'],
        description: 'Aromatičan IPA s izraženim tropskim hmeljem i ugodnom gorčinom.',
        imageUrl: '../static/images/beers/1.png',
      },
      {
        name: 'Tamni Brlog Stout',
        price: 32,
        abv: 7.2,
        color: 'tamna',
        type: 'Stout',
        volume: 500,
        manufacturer: m['Pivovara Brlog'],
        description: 'Bogati stout s notama kave i tamne čokolade.',
        imageUrl: '../static/images/beers/5.png',
      },
      {
        name: 'Medved Sveži Pils',
        price: 22,
        abv: 5.0,
        color: 'svijetla',
        type: 'Pilsner',
        volume: 500,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Klasični pilsner s čistim i svježim završetkom.',
        imageUrl: '../static/images/beers/9.png',
      },
      {
        name: 'Medved Amber Ale',
        price: 26,
        abv: 5.8,
        color: 'jantarna',
        type: 'Amber Ale',
        volume: 500,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Komentar karameliziranih slada i blage citrusne note.',
        imageUrl: '../static/images/beers/13.png',
      },
      {
        name: 'Zadruga Voćni Sour',
        price: 30,
        abv: 4.5,
        color: 'roza',
        type: 'Sour',
        volume: 375,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Kiselkasto-voćni sour s prirodnim okusom maline.',
        imageUrl: '../static/images/beers/17.png',
      },
      {
        name: 'Zadruga Svetlo Pšenično',
        price: 24,
        abv: 5.2,
        color: 'svijetla',
        type: 'Wheat',
        volume: 500,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Lagano pšenično pivo, osvježavajuće s notama banane i klinčića.',
        imageUrl: '../static/images/beers/2.png'
      },
      {
        name: 'Nova Runda Session IPA',
        price: 25,
        abv: 4.2,
        color: 'zlatna',
        type: 'Session IPA',
        volume: 440,
        manufacturer: m['Pivovara Nova Runda'],
        description: 'Lagana, ali aromatična IPA za cijeli večernji pivski užitak.',
        imageUrl: '../static/images/beers/6.png',
      },
      {
        name: 'Nova Runda Doppelbock',
        price: 34,
        abv: 8.0,
        color: 'tamno-žuta',
        type: 'Doppelbock',
        volume: 500,
        manufacturer: m['Pivovara Nova Runda'],
        description: 'Punog tijela, slatkast s notama sušenog voća.',
        imageUrl: '../static/images/beers/10.png',
      },
      {
        name: 'Brlog Hoppy Pale Ale',
        price: 27,
        abv: 5.6,
        color: 'zlatna',
        type: 'Pale Ale',
        volume: 500,
        manufacturer: m['Pivovara Brlog'],
        description: 'Biljne i citrusne note hmelja, uravnotežena gorčina.',
        imageUrl: '../static/images/beers/14.png',
      },
      {
        name: 'Medved Tamni Porter',
        price: 29,
        abv: 6.0,
        color: 'tamna',
        type: 'Porter',
        volume: 500,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Gusta tekstura s notama karamele i pržene kave.',
        imageUrl: '../static/images/beers/18.png',
      },
      {
        name: 'Zadruga Citrus IPA',
        price: 28,
        abv: 6.0,
        color: 'zlatna',
        type: 'IPA',
        volume: 500,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Izrazito citrusan profil, idealan uz ljetne obroke.',
        imageUrl: '../static/images/beers/3.png',
      },
      {
        name: 'Brlog Black Velvet Stout',
        price: 36,
        abv: 9.0,
        color: 'crna',
        type: 'Imperial Stout',
        volume: 330,
        manufacturer: m['Pivovara Brlog'],
        description: 'Imperial stout s kompleksnim aromama čokolade i tamnog voća.',
        imageUrl: '../static/images/beers/7.png',
      },
      {
        name: 'Nova Runda Saison',
        price: 26,
        abv: 5.5,
        color: 'zlatna',
        type: 'Saison',
        volume: 500,
        manufacturer: m['Pivovara Nova Runda'],
        description: 'Suho i začinjeno, odličan uz sireve i uz roštilj.',
        imageUrl: '../static/images/beers/11.png',
      },
      {
        name: 'Medved Klasik Lager',
        price: 20,
        abv: 4.8,
        color: 'svijetla',
        type: 'Lager',
        volume: 500,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Tradicionalni lager, lagan i osvježavajuć.',
        imageUrl: '../static/images/beers/15.png',
      },
      {
        name: 'Zadruga Čoko Milk Stout',
        price: 31,
        abv: 6.3,
        color: 'crna',
        type: 'Milk Stout',
        volume: 500,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Slatkast stout s dodatkom mliječnog šećera i podtonom čokolade.',
        imageUrl: '../static/images/beers/19.png',
      },
      {
        name: 'Brlog Red Ale',
        price: 27,
        abv: 5.9,
        color: 'crvena',
        type: 'Red Ale',
        volume: 500,
        manufacturer: m['Pivovara Brlog'],
        description: 'Kombinacija karamele i lagane citrusne gorčine.',
        imageUrl: '../static/images/beers/4.png',
      },
      {
        name: 'Nova Runda Berry Sour',
        price: 33,
        abv: 4.0,
        color: 'crvena',
        type: 'Fruit Sour',
        volume: 375,
        manufacturer: m['Pivovara Nova Runda'],
        description: 'Kiselo-voćni napitak s intenzivnim notama bobičastog voća.',
        imageUrl: '../static/images/beers/8.png',
      },
      {
        name: 'Medved Hazy IPA',
        price: 29,
        abv: 6.8,
        color: 'mutna-zlatna',
        type: 'Hazy IPA',
        volume: 440,
        manufacturer: m['Pivovara Medvedgrad'],
        description: 'Neprozoran, tropski aromatičan i vrlo pitak.',
        imageUrl: '../static/images/beers/12.png',
      },
      {
        name: 'Zadruga Session Lager',
        price: 19,
        abv: 4.0,
        color: 'svijetla',
        type: 'Session Lager',
        volume: 500,
        manufacturer: m['Pivovara Zadruga'],
        description: 'Lagan lager s naglaskom na osvježavajuću pitičnost.',
        imageUrl: '../static/images/beers/16.png',
      },
      {
        name: 'Brlog Barrel Aged Ale',
        price: 45,
        abv: 10.2,
        color: 'jantarna',
        type: 'Barrel Aged Ale',
        volume: 330,
        manufacturer: m['Pivovara Brlog'],
        description: 'Složeno pivo odležano u bačvama s izraženim drvenim notama.',
        imageUrl: '../static/images/beers/20.png',
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