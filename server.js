var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
//var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var crashRouter = require('./routes/crash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get ('/crash', crashRouter.get);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/
var server_app = http.createServer(app);

// Start listening to the port
server_app.listen(process.env.PORT || 5000, function () {
  console.log('listening on http://localhost:' + (process.env.PORT || 5000)); //8080
});
