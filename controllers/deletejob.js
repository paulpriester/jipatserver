const deleteJob = require('../models/jobs');
const axios = require('axios');

exports.deleteJob = function(req, res) {
	deleteJob.remove({_id:req.params.id}, function(err, jobs) {
		console.log(jobs)
		res.send(jobs)
	})
}