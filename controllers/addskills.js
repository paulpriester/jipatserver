const Skills = require('../models/skills');

exports.Skills = function(req, res) {
	new Skills({
		skills: req.body.skills
	})
	.save(function(err, doc) {
						if(err){
							console.log(err)
						}else{
							res.send('doc')
					}		
		});
}