const fetchProfile = require('../models/user');

exports.fetchProfile = function(req, res) {
	fetchProfile.find({studentId: req.user._id}, function(err, user) {
		console.log(req.user)
		res.send(req.user)
	})
}