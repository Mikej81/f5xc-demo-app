var express = require('express');
var router = express.Router();
var QRCode = require('qrcode')


/* GET QR Code Form. */
router.get('/', function (req, res, next) {
  session = req.session;
  if (session.userid) {
    res.render('qrcodes', { error: false, title: 'Demo Web Application', username: session.userid });
  }
  else {
    res.redirect('/');
  }

});

/* POST */
router.post('/gen', function (req, res, next) {
  const qrstring = req.body.inputUrl;

  if (qrstring) {
    QRCode.toDataURL(qrstring, function (err, url) {
      res.render('qrcodes', { qrcode: url, title: 'Demo Web Application', username: session.userid });
    })
  }
  else {
    res.render('qrcodes', { error: true, title: 'Demo Web Application', username: session.userid });
  }

})

module.exports = router;
