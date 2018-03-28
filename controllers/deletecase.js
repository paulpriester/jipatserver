const deleteCase = require('../models/case');
const axios = require('axios');

exports.deleteCase = function(req, res) {
	deleteCase.remove({_id:req.params.id}, function(err, Case) {
		if(req.user.admin) {
			deleteCase.find({}, function(err,allcases){
			return res.send(allcases)
		})
		} else {
			deleteCase.find({studentId: req.user._id}, function(err,allcases){
			return res.send(allcases)
		})
		}
	})
}