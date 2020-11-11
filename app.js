var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var pug = require('pug');
// connection string using mongoose:
var uri = 'mongodb+srv://jnewton:gGtNgpMSUYgGpnNd@cctusers.t3lby.mongodb.net/CCTUsers?retryWrites=true&w=majority';
mongoose.Promise = global.Promise
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
//Access to various routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var regRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var welcomeRouter = require('./routes/welcome');
var statusRouter = require('./routes/status');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Various Routes can go here
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/register', usersRouter);
app.use('/users/login', usersRouter);
app.use('/test', testRouter);
app.use('/register', regRouter);
app.use('/login', loginRouter);
app.use('/welcome', welcomeRouter);
app.use('/status', statusRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
