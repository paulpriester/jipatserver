const Jobs = require('../models/jobs');
const moment = require('moment')

exports.Jobs = function(req, res) {
	new Jobs({
		title: req.body.title,
		location: req.body.location,
		jobid: req.body.id,
		description: req.body.description,
		company: req.body.company,
		how_to_apply: req.body.how_to_apply,
		created_at: req.body.created_at,
		type: req.body.type,
		email: req.body.email,
		author: req.user.firstName,
		date:  Date.now(),
		byuser: true,
		jobPrivate: req.body.jobPrivate
	})
	.save(function(err, doc) {
						if(err){
							console.log(err)
						}else{
							console.log(doc)
							res.send(doc)
					}		
				});
}

// moment(Date.now().format('MMMM Do YYYY'))