var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config(process.cwd(), '../.env');

// access config var
process.env.TOKEN_SECRET;


/* GET headers page. */
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Demo Web Application' });
});

router.post('/', function (req, res, next) {
    const token = generateAccessToken({ username: req.body.username });
    res.set('Authorization', 'Bearer ' + token);
    //res.status(201).json(token);
    res.render('login', { title: 'Demo Web Application' });
});

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = router;
