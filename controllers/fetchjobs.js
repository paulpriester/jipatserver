const fetchJob = require('../models/jobs');
const fetchCase = require('../models/case');

exports.fetchJob = function(req, res) {
	fetchJob.find({}, function(err, jobs) {
		res.send(jobs)
	})
}
