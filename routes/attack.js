var express = require('express');
var router = express.Router();
var shell = require('shelljs');

/* GET Attacked! */
router.get('/', function (req, res, next) {
  // Run external tool synchronously
  if (shell.exec('python DoDamage.py"').code !== 0) {
    shell.echo('Error: Attack failed!');
    shell.exit(1);
  }
  res.send('You evil hacker!');
});

module.exports = router;
