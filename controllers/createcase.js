const saveCase = require('../models/case');
const Job = require('../models/jobs');
const moment = require('moment');

exports.saveCase = function(req, res) {
	Job.findOne({_id:req.params.id}, function(err,job) {
		console.log(job.title)
		new saveCase({
		studentName:req.user.firstName,
		studentId: req.user._id,
		jobTitle: job.title,
		job_id: job.jobid,
		jobDescription: job.description,
		company: job.company,
		job_location: job.location,
		job_applied: true,
		date: Date.now(),
		openCase: 'Open',
		statusUpdateDate: Date.now()
	})
	.save(function(err, doc) {
						if(err){
							console.log(err)
						}else{
							console.log(doc)
							job.update({$unset: {expireAt: 1}}, function(){
								if(err){
									console.log(err)
								}else{
									return res.send('success')
								}
							})
					}
			});
	})
}