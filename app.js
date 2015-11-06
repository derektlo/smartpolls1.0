var express         = require('express'),
    path            = require('path'),
    favicon         = require('serve-favicon')
    logger          = require('morgan')
    cookieParser    = require('cookie-parser')
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    expressSession  = require('express-session'),
    flash           = require('connect-flash'),
    //dbConfig        = require('./db'),
    mongoose        = require('mongoose');

var app             = express();

var api             = require('./routes/api'),
    initPassport    = require('./passport/init');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Connect to DB
//mongoose.connect(dbConfig.url);
var uristring = process.env.MONGOLAB_URI;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

// Configuring Passport
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
initPassport(passport);

// Configure Routes
var routes = require('./routes/routes')(passport);

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express.static('./public', { index: false}))
    .use('/', routes)
    .use('/api', api)
    .use(function(req, res) {
        res.redirect('/');
    })
    .listen(3000, function(){
      console.log("Listening on port 3000.")
    });



/// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
