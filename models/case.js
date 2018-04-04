const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;


const caseSchema = new Schema({
	jobTitle: String,
	job_id: String,
	jobDescription: String,
	studentName: String,
	studentId: String,
	date: Date,
	openCase: Boolean,
	closeCase: Boolean,
	placeCase: Boolean,
	statusUpdateDate: Date
});


const ModelClass = mongoose.model('case', caseSchema);

module.exports = ModelClass; 