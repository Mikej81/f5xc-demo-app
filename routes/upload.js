var express = require('express');
var router = express.Router();

var path = require('path');

//multer object creation
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage })

router.get('/', function (req, res, next) {
  session = req.session;
  res.render('upload', { error: false, title: 'Demo Web Application' });

});

/* POST */
router.post('/', function (req, res, next) {
  //router.post('/', upload.single('imageupload'), function (req, res, next) {
  res.render('upload', { error: false, title: 'Demo Web Application', upload: 'Success!' });
  //res.send("File upload sucessfully.");
})

module.exports = router;
