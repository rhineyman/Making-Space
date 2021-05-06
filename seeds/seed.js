const userSeeds = require('./userSeeds');
const postSeeds = require('./postSeeds');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await userSeeds();    
    await postSeeds();

    process.exit(0);
};

seedDatabase();