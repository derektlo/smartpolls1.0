var bCrypt 			= require('bcrypt-nodejs'),
	LocalStrategy   = require('passport-local').Strategy,
	User 			= require('../models/user');

module.exports = function(passport) {
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            findOrCreateUser = function() {
                User.findOne({ 'username' : username }, function(err, doc) {
                    if (err) {
                        console.log('Error in Signup: '+err);
                        return done(err);
                    }

                    if (doc) {
                        console.log('User already exists with username: ' + username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    }

					// Create
					var newUser = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.param('email');

					console.log('creating a new user: ' + username, password, newUser.email);

                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );
}
