var express     = require('express'),
    path        = require('path');

var router      = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        //res.redirect('/dashboard');
        return next();
    }
    res.redirect('/');
}

module.exports = function(passport) {
    // router.get('*', function(req, res){
    //     console.log("here");
    //     next();
    // });
    router.get('/', function(req, res) {
        res.sendFile(path.join(__dirname+'/../public/index.html'), { message: req.flash('message') });
    });

    router.get('/dashboard', isAuthenticated, function(req, res){
            res.sendFile(path.join(__dirname+'/../public/main.html'), { user: req.user });
	});

    router
        .get('/login', function (req, res) {
            res.sendFile(path.join(__dirname+'/../public/login.html'), {message: req.flash('message') });
        })
        .post('/login', passport.authenticate('login', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash : true
        }));

    router.get('/signup', function (req, res) {
        res.sendFile(path.join(__dirname+'/../public/signup.html'), { message: req.flash('message')});
    });

    router.post('/signup', passport.authenticate('signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup',
            failureFlash : true
    }));

    router.get('/logout', function (req, res) {
            req.user = null;
            res.redirect('/');
    });

    return router;
}
