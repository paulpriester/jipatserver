const deleteJob = require('../models/jobs');

exports.deleteJob = function(req, res) {
	deleteJob.remove({_id:req.params.id}, function(err, jobs) {
		deleteJob.find({}, function(err,alljobs){
			return res.send(alljobs)
		})
	})
}

// {date:{$lt: new Date(2018, 4, )}