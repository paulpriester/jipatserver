const Invitation = require("../models/email"),
	  jobs = require('../models/jobs'),
	  nodemailer = require('nodemailer')


exports.shareJobs = function(req,res,next) {
		const email = req.body.email;
		const name = req.body.name;
		const msg = req.body.msg;
		const id = req.params.jobid;
		var transporter = nodemailer.createTransport({
				 service: 'gmail',
				 auth: {
				        user: 'nodemailertest507@gmail.com',
				        pass: 'idontcare'
				    }
				});

				const mailOptions = {
				  from: 'nodemailertest507@gmail.com', // sender address
				  to: email, // list of receivers
				  subject:name, // Subject line
				  html: `<p>Hello ${name},</p>` + `<p>${msg}</p>` + `<a href=http://localhost:8080/jobdetail?id=${id}> Link</a>` // plain text body
				};

				transporter.sendMail(mailOptions, function (err, info) {
				   if(err)
				     console.log(err)
				   else
				     console.log(info);
				});	
				res.json(transporter)
}
