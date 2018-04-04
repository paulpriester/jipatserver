const saveCase = require('../models/case');
const Job = require('../models/jobs');

exports.saveCase = function(req, res) {
	Job.findOne({_id:req.params.id}, function(err,job) {
		console.log(job.title)
		new saveCase({
		jobTitle: job.title,
		job_id: job.jobid,
		jobDescription: job.description,
		studentName:req.user.firstName,
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
							return res.send('success')
					}
			});
	})
}