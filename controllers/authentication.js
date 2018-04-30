const User = require('../models/user'),
	  jwt = require('jwt-simple'),
	  config = require('../config')


 function tokenForUser(user) {
	  	const timestamp = new Date().getTime();
	  	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
	  }

exports.signin = function(req, res, next) {
	// User has already had their email and password auth'd
	// We need to give them a token
	let type; 
	if(req.user.admin) {
		type = 'admin'
	} else {
		type = 'student'
	}
	res.send({ token: tokenForUser(req.user), type: type});
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
			about: '',
			portfolio: '',
			linkedin: '',
			github: '',
			resume: '',
			careergoals: ''
		});

		user.save(function(err) {
			if (err) {return next(err);}

		//Respond to request indicating the user was created
		res.json({ token: tokenForUser(user) });
		});
	});
};

exports.signupAdmin = function(req, res, next) {
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
			firstName: '',
			lastName: '',
			about: '',
			admin: true
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
	const portfolio = req.body.portfolio;
	const linkedin = req.body.linkedin;
	const github = req.body.github;
	const resume = req.body.resume;
	const careergoals = req.body.careergoals;

	User.findOneAndUpdate( {_id:req.user._id}, {$set: {"firstName": firstName, "lastName": lastName, "about": about, 
											 "portfolio": portfolio, "linkedin": linkedin, "github": github, "resume": resume, "careergoals": careergoals}},
		 function(err, user) {
			if(err){
				return res.send(err)
			} else {
				return res.send('successful')
			}	
		})
	}




