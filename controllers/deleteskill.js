const deleteSkill = require('../models/skills');

exports.deleteSkill = function(req, res) {
	deleteSkill.remove({_id:req.params.id}, function(err, skills) {
		deleteSkill.find({}, function(err,allskills){
			console.log('test')
			return res.send(allskills)
		})
	})
}