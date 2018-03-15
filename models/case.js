const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;


const caseSchema = new Schema({
	jobTitle: String,
	job_id: String,
	studentName: String,
	studentId: String,
	date: Date
});


const ModelClass = mongoose.model('case', caseSchema);

module.exports = ModelClass; 