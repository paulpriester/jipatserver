const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;


const jobSchema = new Schema({
	title: { type: String, lowercase: true },
	jobid: { type: String},
	location: {type: String},
	description: {type: String},
	byuser: {type: Boolean, default: false}
});


const ModelClass = mongoose.model('jobs', jobSchema);

module.exports = ModelClass; 