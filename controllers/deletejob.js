const deleteJob = require('../models/jobs');
const axios = require('axios');

exports.deleteJob = function(req, res) {
	deleteJob.remove({_id:req.params.id}, function(err, jobs) {
		deleteJob.find({}, function(err,alljobs){
			return res.send(alljobs)
		})
	})
}