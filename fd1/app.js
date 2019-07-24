var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dbStatus = "success";
var app = express();
var url = "mongodb://localhost:27017/mydb";
//var url = "mongodb://binoy:binoy123@ds058508.mlab.com:58508/mydb"
mongoose.connect(url).then(
  () => { console.log("connection success");},
  err => { console.log("connection error : " + err);
    dbStatus = "connection error : " + err;
    app.set('dbStatus', dbStatus);
  }
);
mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
  console.log("------------>" + dbStatus)
  console.log("2------------>" + app.settings.dbStatus)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT,OPTIONS, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
