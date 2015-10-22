var LocalStrategy   = require('passport-local').Strategy,
	bCrypt 			= require('bcrypt-nodejs'),
	User			= require('../models/user');

module.exports = function(passport){

	var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            User.findOne({ 'username' :  username }, function(err, user) {
                if (err) {
                    return done(err);
				}

				if (!user){
                    console.log('User Not Found with username '+username);
                    return done(null, false, req.flash('message', 'User Not found.'));
                }

                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                }

				// Success
                return done(null, user);
            });

        })
    );
}
