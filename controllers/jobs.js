const saveJob = require('../models/jobs');
const axios = require('axios');

exports.saveJob= function (req, res, next) {
	 axios.get(`https://jobs.github.com/positions.json?search=`)
	.then(response => {
		console.log(response.data)
			var alljobs =  response.data.map(i=> {
			 	saveJob.findOne({id: i.id}, function(err, existingJob) {
					if (err) {
						console.log(err)
					 }
					if (existingJob) {
						console.log("exist")
					}

					if (!existingJob) {
						new saveJob({
						title: i.title,
						location: i.location,
						jobid: i.id,
						description: i.description
					}).save(function(err, doc) {
						if(err){
							console.log(err)
						}else{
							console.log(doc)
					}	
						
				});
		 	}
   		})
  	 })
	Promise.all(alljobs).then(result=>console.log(result))
   })
}
	