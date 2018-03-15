const fetchCase = require('../models/case');
const axios = require('axios');

exports.fetchCase = function(req, res) {
	fetchCase.find({}, function(err, cases) {
		console.log(cases)
		res.send(cases)
	}).sort({date: -1})
}

