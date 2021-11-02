const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config(process.cwd(), '../.env');

// access config var
process.env.TOKEN_SECRET;

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
    { id: 2, username: 'jorge', password: 'test', firstName: 'Jorge', lastName: 'Constanza' }
];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}