const Invitation = require("../models/email"),
	  jobs = require('../models/jobs'),
	  nodemailer = require('nodemailer')


exports.shareJobs = function(req,res,next) {
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const how_to_apply = req.body.how_to_apply

		const invitation = new Invitation({
			email: email,
			firstName: firstName,
			lastName: lastName,
			how_to_apply: how_to_apply
		});


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
			  subject: invitation.firstName, // Subject line
			  html: '<p>Hello </p>'+ invitation.firstName + invitation.lastName + '<p>Here is the Link to the job</p>' + "<a href='http://localhost:3000/sharejobs' >here</a>" // plain text body
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
