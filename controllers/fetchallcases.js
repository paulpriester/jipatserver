const fetchCase = require('../models/case');

exports.fetchCase = function(req, res) {
	fetchCase.find({}, function(err, cases) {
		console.log(cases)
		res.json(cases)
	})
}