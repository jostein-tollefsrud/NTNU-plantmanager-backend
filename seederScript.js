require('dotenv').config();
const Plant = require('./models/plant');
const User = require('./models/user');
require('./config/database');
const bcrypt = require('bcrypt');

const importData = async () => {
    const password = await bcrypt.hash('Password123', 10);
    const users = [
        {
            firstName: 'Ola',
            lastName: 'Nordmann',
            email: 'ola@email.com',
            role: 'manager',
            password: password,
        },
        {
            firstName: 'Kari',
            lastName: 'Nordmann',
            email: 'kari@email.com',
            role: 'gardener',
            password: password,
        },
        {
            firstName: 'Nils',
            lastName: 'Nordmann',
            email: 'nils@email.com',
            role: 'user',
            password: password,
        },
    ];

    const plants = [
        {
            lastWateredByUser: 'Kari Nordmann',
            lastWateredAtTime: '2021-06-07T10:16:00.869+00:00',
            lastFertilizedByUser: 'Kari Nordmann',
            lastFertilizedAtTime: '2021-06-07T10:16:01.820+00:00',
            name: 'Spiky',
            type: 'Aloe Vera',
            location: '1st Floor, Office',
            waterFrequency: 7,
            fertilizingFrequency: 32,
            light: 'direct sunlight',
        },
        {
            lastWateredByUser: 'Ola Nordmann',
            lastWateredAtTime: '2021-06-07T10:16:00.869+00:00',
            lastFertilizedByUser: 'Ola Nordmann',
            lastFertilizedAtTime: '2021-06-07T10:16:01.820+00:00',
            name: 'Hunter',
            type: 'Cactus',
            location: '2st Floor, Office',
            waterFrequency: 14,
            fertilizingFrequency: 45,
            light: 'direct sunlight',
        },
    ];
    try {
        await Plant.deleteMany({});
        await Plant.insertMany(plants);

        await User.deleteMany({});
        await User.insertMany(users);

        console.log('Data import success!');
        process.exit();
    } catch (error) {
        console.error('Error with data import!', error);
        process.exit(1);
    }
};

importData();
