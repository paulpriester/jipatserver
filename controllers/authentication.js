const User = require('../models/user'),
	  jwt = require('jwt-simple'),
	  async = require('async'),
	  crypto = require("crypto"),
	  nodemailer = require('nodemailer');
	  config = require('../config')

 function tokenForUser(user) {
	  	const timestamp = new Date().getTime();
	  	return jwt.encode({ sub: user.id, iat: timestamp }, process.env.secret);
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
			cases: []
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

exports.forgotPassword = function(req, res, next) {
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			})
		},
		function(token, done) {
			User.findOne({ email: req.body.email}, function(err, user) {
				if(!user) {
					return res.send('User Does not exist')
				}

				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 36000000 //1 hour

				user.save(function(err) {
					done(err, token, user);
				})
			})
		},
		function(token, user, done) {
			const smtpTransport = nodemailer.createTransport({
				service: 'Gmail',
				auth: {
					user: 'nodemailertest507@gmail.com',
					pass: 'idontcare'
				}
			})
			const mailOptions = {
				to: user.email,
				from: 'nodemailertest507@gmail.com',
				subject: 'Job Board Password Reset',
				text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
          			  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          			  'http://localhost:8080/reset/' + token + '\n\n' +
          			  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			}
			smtpTransport.sendMail(mailOptions, function(err) {
				console.log("mail sent");
				res.send('success')
				done(err, 'done');
			})
		}
	], function(err) {
		if(err) {
			return next(err);
			res.send('Error here')
		}
	})
}

exports.passwordResetMount = function (req, res) {
  User.findOne({ resetPasswordToken: req.params.tokenId, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      return res.send('Password reset token is invalid or has expired.');
    }
  });
}

exports.passwordReset = function (req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.tokenId, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      	console.log(user)
        if (!user) {
          return res.send('Password reset token is invalid or has expired.');
        }
        if(req.body.password === req.body.confirmPassword) {

          user.password = req.body.password 
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(function(err) {
              res.send("success")
          })
        } else {
            return res.send('Passwords do not match.');
        }
      });
    },
    function(user, done) {
    	console.log()
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'nodemailertest507@gmail.com',
          pass: 'idontcare'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'nodemailertest507@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.send('Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    	res.send('error');
  });
}

exports.signupDetail = function(req, res) {

	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const about = req.body.about;
	const portfolio = req.body.portfolio;
	const linkedin = req.body.linkedin;
	const github = req.body.github;
	const resume = req.body.resume;
	const careergoals = req.body.careergoals;

	console.log(req);
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

exports.studentScore = function(req, res) {
	const score = req.body.score;

	console.log(req.body)
	User.findOneAndUpdate( {_id:req.params.id}, {$set: {'score': score}},
		 function(err, user) {
			if(err){
				return res.send(err)
			} else {
				return res.send('successful')
			}	
		})
	}

	// let changes = {}
	// if(req.body.firstName !=""){
	// 	changes.firstName = req.body.firstName
	// }