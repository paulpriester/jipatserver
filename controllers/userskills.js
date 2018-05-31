const user = require('../models/user');

exports.skills = function(req, res) {
	let skills = req.body.Skills
	console.log("HERE" +skills)

	user.findOneAndUpdate({_id:req.user._id}, {$addToSet: {'skills': {$each :skills}}},{new:true},
	 function(err,doc) {
			if(err){
				return res.send(err)
			} else {
				return res.json({skills:doc.skills})
			}	
		}
)}
