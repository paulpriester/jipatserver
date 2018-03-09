const cases = require('../models/case');
const axios = require('axios');

exports.cases = function(req, res) {
	cases.find({}, function(err, cases) {
		console.log(cases)
		res.send(cases)
	})
}