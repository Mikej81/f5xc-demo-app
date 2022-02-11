var express = require('express');
var router = express.Router();
var login = require('../controller/authenticate/login');

/* GET */
router.get('/', function (req, res, next) {
    res.redirect('/');
});

/*  POST. */
router.post('/login', function (req, res, next) {
    session = req.session;
    const username = req.body.username;
    session.userid = req.body.username;
    let loginResult = login(username, req.body.password);

    if (loginResult) {
        //res.render('users', { username: username });
        //res.render('index', { error: false, username: username });
        res.redirect('/');
    }
    else {
        res.render('index', { error: true });
    }
});

module.exports = router;