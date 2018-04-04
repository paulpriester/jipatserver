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
	// updatecase.findOne( {_id:req.params.id}, function(err, Case) {
	// 	if(err){
	// 		return res.send(err)
	// 	if(!Case){
	// 		return res.send("Not a Case")
	// 	}
	// 	} else {
	// 		console.log(Case)

	// 		if(Case.openCase) {

				// Case.openCase = req.body.openCase
				// Case.statusUpdateDate = Date()

				// Case.save(function(err) {
				// 	if(err){
				// 	return res.send(err)

				// } else {
				// 	res.send('success')
				// }})

	// 		} 
	// 	}	
	// })
	// }
// }else {

// 				Case.openCase = req.bodh
// 				Case.statusUpdateDate = Date()

				
// 				Case.save(function(err) {
	// 				if(err){
	// 				return res.send(err)

	// 			} else {
	// 				res.send('success')
	// 			}})
	// 		}
	// }


	