const Case = require('../models/case');

exports.fetchOneCase = function(req, res) {
	Case.findOne({_id: req.params._id}, function(err, Case) {
		res.send(Case)
	})
}