const expressJwt = require('express-jwt');
const dotenv = require('dotenv');

// get config vars
dotenv.config(process.cwd(), '../.env');

// access config var
process.env.TOKEN_SECRET;

module.exports = jwt;

function jwt() {
    const secret = process.env.TOKEN_SECRET;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate'
        ]
    });
}