const User = require('../models/user'),
	  jwt = require('jwt-simple'),
	  config = require('../config'),
	  objectId = require('mongodb').ObjectID;

	  function tokenForUser(user) {
	  	const timestamp = new Date().getTime();
	  	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
	  }

exports.signin = function(req, res, next) {
	// User has already had their email and password auth'd
	// We need to give them a token
	res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;


	if(!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}

	//See if a user with the given email exists
	User.findOne({email: email}, function(err, existingUser){
		if (err) {return next(err); }

		//If a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({error: 'Email is in use'});
		}

		//If a user with email does NOT exist, create and save user record
		const user = new User({
			email: email,
			password: password,
			admin: false,
			firstName: '',
			lastName: '',
			about: ''
		});

		user.save(function(err) {
			if (err) {return next(err);}

		//Respond to request indicating the user was created
		res.json({ token: tokenForUser(user) });
		});
	});
};

exports.signupDetail = function(req, res, next) {

	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const about = req.body.about;
	
	// _id.toString()
	User.findOneAndUpdate( {id:req.params.id}, {$set: {"firstName": firstName, "lastName": lastName, "about": about}},
		 function(err, user) {
			if(err){
				res.send(err)
			} else {
				res.send(successful)
			}	

	user.save(function(err) {
			if (err) {return next(err)};

		//Respond to request indicating the user was created
		res.send(User);
		});
	
})
}


