const Jobs = require('../models/jobs');

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
		date:  Date(),
		byuser: true,
		jobPrivate: req.body.jobPrivate,
		job_applied: req.body.job_applied
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