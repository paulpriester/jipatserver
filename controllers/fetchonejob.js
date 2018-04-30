const fetchJob = require('../models/jobs');

exports.fetchOneJob = function(req, res) {
	fetchJob.findOne({_id: req.params._id}, function(err, job) {
		res.send(job)
	})
}