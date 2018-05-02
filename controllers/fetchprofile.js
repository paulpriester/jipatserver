const fetchProfile = require('../models/user');

exports.fetchProfile = function(req, res) {

	let query = req.params.id ? req.params.id : req.user._id

	fetchProfile.findOne({_id: query}, function(err, user) {
		console.log(user)
		res.send(user)
	})
}
