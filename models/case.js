const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;


const caseSchema = new Schema({
	studentName: String,
	job_id: String,
	date: Date
});


const ModelClass = mongoose.model('case', caseSchema);

module.exports = ModelClass; 