var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config(process.cwd(), '../.env');

// access config var
process.env.TOKEN_SECRET;

router.get('/', function (req, res, next) {
    res.status(201).json('OK');
});

router.post('/register', function (req, res, next) {
    const token = generateAccessToken({ username: req.body.username });
    res.set('Authorization', 'Bearer ' + token);
    res.status(201).json(token);
});

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = router;
