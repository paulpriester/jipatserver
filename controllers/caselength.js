const caselength = require('../models/case');

exports.caselength = function(req, res) {
	caselength.find({studentId: req.user._id}, function(err, cases) {
		console.log(cases.length)
		res.json({length: cases.length,
				  cases: cases})
	})
}