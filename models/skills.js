const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

var skillSchema = new Schema({skills: String});


const skillTracker = new Schema({
	skills: [skillSchema]
});


const ModelClass = mongoose.model('skills', skillSchema);

module.exports = ModelClass; 