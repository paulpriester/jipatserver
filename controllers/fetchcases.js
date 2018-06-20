const fetchCase = require('../models/case');

exports.fetchCase = function(req, res) {
	let query = req.params.id ? req.params.id : req.user._id

	fetchCase.find({studentId: query}, function(err, cases) {
		console.log(cases)
		res.send(cases)
	})
}