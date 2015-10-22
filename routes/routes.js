var express     = require('express'),
    path        = require('path');

var router      = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

var dir = function(name) {
    return path.join(__dirname + name);
}

module.exports = function(passport) {

    router.get('/', function(req, res) {
        if (req.user) {
            res.redirect('/dashboard');
        } else {
            res.sendFile(dir('/../public/index.html'), { message: req.flash('message') });
        }
    });

    router.get('/dashboard', isAuthenticated, function(req, res){
            res.sendFile(dir('/../public/main.html'), { user: req.user });
	});

    router
        .get('/login', function (req, res) {
            res.sendFile(dir('/../public/login.html'), {message: req.flash('message') });
        })
        .post('/login', passport.authenticate('login', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash : true
        }));

    router.get('/signup', function (req, res) {
        res.sendFile(dir('/../public/signup.html'), { message: req.flash('message')});
    });

    router.post('/signup', passport.authenticate('signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup',
            failureFlash : true
    }));

    router.get('/logout', function (req, res) {
            req.logout();
            res.redirect('/');
    });

    return router;
}
