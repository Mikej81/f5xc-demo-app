var express = require('express');
var router = express.Router();
var QRCode = require('qrcode')


/* GET QR Code Form. */
router.get('/', function (req, res, next) {
  session = req.session;
  if (session.userid) {
    res.render('qrcodes', { error: false });
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
      res.render('qrcodes', { qrcode: url });
    })
  }
  else {
    res.render('qrcodes', { error: true });
  }

})

module.exports = router;
