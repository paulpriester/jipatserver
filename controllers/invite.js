const Invitation = require("../models/email"),
	  nodemailer = require('nodemailer')

exports.invite = function(req, res, next) {
	const email = req.body.email;
	const name = req.body.name;
	const admin = true;

		const invitation = new Invitation({
			email: email,
			name: name,
			admin: true
		});

		if (admin === false) {
		invitation.save(function(err) {
			if (err) {return next(err);}

			var transporter = nodemailer.createTransport({
			 service: 'gmail',
			 auth: {
			        user: 'nodemailertest507@gmail.com',
			        pass: 'idontcare'
			    }
			});

			const mailOptions = {
			  from: 'nodemailertest507@gmail.com', // sender address
			  to: invitation.email, // list of receivers
			  subject: invitation.name, // Subject line
			  html: '<p>Hello </p>'+ invitation.name + '<p>Here is the Link to Sign up</p>' + "<a href='http://jipat.herokuapp.com/signup' >here</a>" // plain text body
			};

			transporter.sendMail(mailOptions, function (err, info) {
			   if(err)
			     console.log(err)
			   else
			     console.log(info);
			});

			//Respond to request indicating the user was created
				res.json(invitation);
	});
	} else {
		invitation.save(function(err) {
			if (err) {return next(err);}

			var transporter = nodemailer.createTransport({
			 service: 'gmail',
			 auth: {
			        user: 'nodemailertest507@gmail.com',
			        pass: 'idontcare'
			    }
			});

			const mailOptions = {
			  from: 'nodemailertest507@gmail.com', // sender address
			  to: invitation.email, // list of receivers
			  subject: invitation.name, // Subject line
			  html: '<p>Hello </p>'+ invitation.name + '<p>Here is the Link to Sign up</p>' + "<a href='http://jipat.herokuapp.com/signupad' >here</a>" // plain text body
			};

			transporter.sendMail(mailOptions, function (err, info) {
			   if(err)
			     console.log(err)
			   else
			     console.log(info);
			});

			//Respond to request indicating the user was created
				res.json(invitation);
	});
	}
}

