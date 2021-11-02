var express = require('express');
var router = express.Router();

/* GET headers page. */
router.get('/', function (req, res, next) {
  res.cookie('DemoCookie', 'OopEepOrpAhAh', {
    maxAge: 3600,
    secure: true,
    httpOnly: true,
    sameSite: 'lax'
  });
  res.render('index', { title: 'Demo Web Application' });
});

module.exports = router;
