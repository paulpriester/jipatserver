const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;


const jobSchema = new Schema({
	title: { type: String },
	jobid: { type: String},
	location: {type: String},
	description: {type: String},
	company: String,
	how_to_apply: String,
	created_at: {String},
	type: String,
	byuser: {type: Boolean, default: false},
	date: {type:Date},
	expireAt: {type: Date, default: undefined},
	jobPrivate: {type: Boolean, default: false},
	job_applied: {type: Boolean, default: false}
});

// jobSchema.index({'expireAt': 1}, {expireAfterSeconds: 0})
const ModelClass = mongoose.model('jobs', jobSchema);

module.exports = ModelClass; 