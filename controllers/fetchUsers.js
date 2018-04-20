const fetchUser = require('../models/user');

exports.fetchUser = function(req, res) {
	fetchUser.find({}, function(err, user) {
		console.log(user)
		res.json(user)
	})
}