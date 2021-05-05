const { User } = require('../models');

const userData =[
    {
        "username": "myke",
        "email":"myke@gmail.com",
        "password": "password1"        
    },
    {
        "username": "rhineyman",
        "email":"rhineyman@aol.com",
        "password": "password"    
    }
];

const userSeeds = () => User.bulkCreate(userData);
module.exports = userSeeds;