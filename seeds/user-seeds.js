const { User } = require('../models');

const usersData = [
    {
        user_name: 'code4life',
        email: 'cooldeveloper@gmail.com',
        password: 'fsd12345'
    },
    {
        user_name: 'superSonic32',
        email: 'spinball32@gmail.com',
        password: 'gottagofast32'
    },
    {
        user_name: 'catlady404',
        email: 'adoptdontshop@gmail.com',
        password: 'softkitty45'
    },
    {
        user_name: 'chronicallyTired1',
        email: 'neversleep23@gmail.com',
        password: 'keyLimePie88'
    }
];

const seedUsers = () => User.bulkCreate(usersData, {individualHooks: true});

module.exports = seedUsers;