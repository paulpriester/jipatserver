const caselength = require('../models/case');

exports.caselength = function(req, res) {
		let query = req.params.id ? req.params.id : req.user._id

	caselength.find({studentId: query}, function(err, cases) {
		console.log(cases.length)
		res.json({length: cases.length,
				  cases: cases})
	})
}