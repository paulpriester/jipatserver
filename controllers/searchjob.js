const searchJob = require('../models/jobs');

exports.searchJob = function(req, res) {
		let query;
		if(!req.params.location){
			query= {title: {$regex:req.params.title, $options: "i"}}
		}
		else if(req.params.title=="empty"){
			query= {location: {$regex:req.params.location, $options: "i"}}
		}
		else{
			query= {location: {$regex:req.params.location, $options: "i"},title: {$regex:req.params.title, $options: "i"}}
		}
		searchJob.find(query, function(err, alljobs) {
			console.log(alljobs)
		    res.send(alljobs)
	})
}
