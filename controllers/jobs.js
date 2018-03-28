const saveJob = require('../models/jobs');
const axios = require('axios');
const schedule = require('node-schedule');

function stripHTML(text) {
 return text.replace(/<.*?>/gm, '');
}

var test = schedule.scheduleJob('17 13 * * *',function () {
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
						description: stripHTML(i.description),
						company: i.company,
						how_to_apply: stripHTML(i.how_to_apply),
						created_at: i.created_at,
						type: i.type,
						date:  Date()
					}).save(function(err, doc) {
						if(err){
							console.log(err)
						}else{
							// console.log(doc)
					}		
				});
		 	}
   		})
  	 })
	Promise.all(alljobs).then(result=>console.log(result))
   })
})
module.exports = test;