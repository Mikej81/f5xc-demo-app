var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

/* GET headers page. */
router.get('/', function (req, res, next) {
    res.cookie('DemoCookie', 'OopEepOrpAhAh', {
        maxAge: 3600,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.render('cookies', { title: 'Demo Web Application', data: req.cookies });
});

module.exports = router;
