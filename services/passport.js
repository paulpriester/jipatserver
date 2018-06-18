 const passport = require('passport'),
 	   User = require('../models/user'),
 	   config = require('../config'),
 	   JwtStrategy = require('passport-jwt').Strategy,
 	   ExtractJwt = require('passport-jwt').ExtractJwt,
 	   LocalStrategy = require('passport-local');


// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password,done) {
	// Verify this username and password, call done with the user
	// if is is the correct username and password
	// otherwise, call done with false
	User.findOne({ email: email }, function(err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }

		// compare passwords - is `password` equal to user.password?
		user.comparePassword(password, function(er, isMatch) {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false); }

			return done(null, user);
		});
	});
});

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: process.env.secret
};

// Create JWT strategy

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	// See if the user Id in the payload exists in our database
	// If it does, call 'done' with that other
	// otherwise, call done without a user object
	User.findById(payload.sub, function(err, user) {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);