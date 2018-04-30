const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;


const caseSchema = new Schema({
	jobTitle: String,
	job_id: String,
	jobDescription: String,
	job_location: String,
	job_applied: Boolean,
	studentName: String,
	studentId: String,
	company: String,
	date: Date,
	openCase: String,
	statusUpdateDate: Date
});


const ModelClass = mongoose.model('case', caseSchema);

module.exports = ModelClass;  