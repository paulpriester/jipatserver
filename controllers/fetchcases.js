const fetchCase = require('../models/case');

exports.fetchCase = function(req, res) {
	fetchCase.find({studentId: req.user._id}, function(err, cases) {
		console.log(cases)
		res.send(cases)
	})
}