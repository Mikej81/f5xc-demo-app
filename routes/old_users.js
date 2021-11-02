var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.cookie('DemoCookie', 'OopEepOrpAhAh', {
    maxAge: 3600,
    secure: true,
    httpOnly: true,
    sameSite: 'lax'
  });
  res.send('respond with a resource');
});

module.exports = router;
