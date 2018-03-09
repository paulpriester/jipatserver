const fetchStudent = require('../models/user');
const axios = require('axios');

exports.fetchStudent = function(req, res) {
	fetchStudent.find({}, function(err, student) {
		console.log(student)
		res.send(student)
	})
}