const Jobs = require('../models/jobs');
const axios = require('axios');

exports.Jobs = function(req, res) {
	new Jobs({
		title: req.body.title,
		location: req.body.location,
		jobid: req.body.id,
		description: req.body.description,
		company: req.body.company,
		how_to_apply: req.body.how_to_apply,
		created_at: req.body.created_at,
		type: req.body.type,
		date:  Date()
	})
	.save(function(err, doc) {
						if(err){
							console.log(err)
						}else{
							res.send(doc)
					}		
				});
}