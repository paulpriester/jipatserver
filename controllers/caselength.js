const fetchcase = require('../models/case');

exports.fetchcase = function(req, res) {
	fetchcase.find({studentId: req.user._id}, function(err, cases) {
		console.log(cases.length)
		res.send(cases)
	})
}
