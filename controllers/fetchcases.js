const fetchCase = require('../models/case');
const axios = require('axios');

exports.fetchCase = function(req, res) {
	fetchCase.find({studentId: req.user._id}, function(err, cases) {
		console.log(cases)
		res.send(cases)
	})
}

