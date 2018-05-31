const saveCase = require('../models/case');
const Job = require('../models/jobs');
const moment = require('moment');

exports.saveCase = function(req, res) {
	Job.findOne({_id:req.params.id}, function(err,job) {
		new saveCase({
		jobTitle: job.title,
		job_id: job.jobid,
		jobDescription: job.description,
		studentName:`${req.user.firstName} ${req.user.lastName}`,
		studentId: req.user._id,
		company: job.company,
		date: Date.now(),
		openCase: 'Open',
		statusUpdateDate: Date.now()
	})
	.save(function(err, doc) {
						if(err){
							console.log(err)
						}else{
							console.log(doc)
							job.update({expireAt:(moment().add(100, 'years'))}, function(){
								if(err){
									console.log(err)
								}else{
									return res.send('success')
								}
							})
							job.save()
					}
			});
	})
}