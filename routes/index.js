var express = require('express');
//const session = require('express-session');
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
  res.render('index', { title: 'Demo Web Application', username: session.userid });
});

module.exports = router;
