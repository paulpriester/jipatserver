const fetchJob = require('../models/jobs');

exports.fetchJob = function(req, res) {
	fetchJob.find({}, function(err, jobs) {
		res.send(jobs)
	})
}
