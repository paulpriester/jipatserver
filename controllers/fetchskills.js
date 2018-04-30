const fetchSkill = require('../models/skills');

exports.fetchSkill = function(req, res) {
	fetchSkill.find({}, function(err, skill) {
		console.log(skill)
		res.send(skill)
	})
}