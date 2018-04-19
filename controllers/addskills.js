const Skills = require('../models/skills');

exports.Skills = function(req, res) {
	new Skills({
		skill: req.body.skill,
		date: Date()
	})
	.save(function(err, doc) {
						if(err){
							console.log(err)
						}else{
							console.log(doc)
							res.send(doc)
					}		
		});
}