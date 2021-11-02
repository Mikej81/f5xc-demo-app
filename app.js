var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var crypto = require('crypto');

const fs = require('fs')
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/old_users');
var headersRouter = require('./routes/headers');
var cookiesRouter = require('./routes/cookies');
var nodeRouter = require('./routes/nodeinfo');
var loginRouter = require('./routes/login');
var userapiRouter = require('./users/users.controller');

var app = express();

if (!fs.existsSync(__dirname + '/.env')) {
  const secret = "TOKEN_SECRET=" + crypto.randomBytes(64).toString('hex');
  try {
    const data = fs.writeFileSync(__dirname + '/.env', secret)
  } catch (err) {
    console.log('[could not write secret to .env]');
  }
}

dotenv.config();
process.env.TOKEN_SECRET;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-status-monitor')());

// use JWT auth to secure the api
//app.use(jwt());

// cookie set up
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 3600, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
});

app.use('/', indexRouter);
app.use('/headers', headersRouter);
app.use('/cookies', cookiesRouter);
app.use('/nodeinfo', nodeRouter);
app.use('/login', loginRouter);
app.use('/users', userapiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
