var express = require('express');
var router = express.Router();

/* GET headers page. */
router.get('/', function (req, res, next) {
    session = req.session;
    res.cookie('DemoCookie', 'OopEepOrpAhAh', {
        maxAge: 3600,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.render('headers', { title: 'Demo Web Application', username: session.userid, reqHeaders: req.headers, resHeaders: res.getHeaders() });
});

module.exports = router;
