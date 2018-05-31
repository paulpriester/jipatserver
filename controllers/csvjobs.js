const job = require('../models/jobs'),
	  csv = require('csv-express');



exports.csvjob = function(req, res) {
		job.find({}, function(err,alljobs){
		if (err){
			res.send('err');
		} else {
	         res.csv(alljobs)
		}        
	})
}