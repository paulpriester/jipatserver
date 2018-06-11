const deleteUser = require('../models/user');

exports.deleteUser = function(req, res) {
	deleteUser.remove({_id:req.params.id}, function(user) {
		deleteUser.find({}, function(){
			console.log(user)
			return res.send('success')
		})
	})
}