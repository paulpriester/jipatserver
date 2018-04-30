const updatecase = require('../models/case');

exports.updatecase = function(req, res) {
	const openCase = req.body.openCase
	const statusUpdateDate = Date()

	updatecase.findOneAndUpdate( {_id:req.params.id}, {$set: {"openCase": openCase, statusUpdateDate: statusUpdateDate}},
		 function(err, Case) {
			if(err){
				return res.send(err)
			} else {
				return res.send('successful')
			}	
		})
}
	