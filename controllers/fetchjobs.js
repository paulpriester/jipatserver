const fetchJob = require('../models/jobs');
const axios = require('axios');

exports.fetchJob = function(req, res) {
	fetchJob.find({}, function(err, jobs) {
		console.log(jobs)
		res.send(jobs)
	})
}