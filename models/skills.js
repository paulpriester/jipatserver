const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;



const skillSchema = new Schema({
	skill: {type:String}
});


const ModelClass = mongoose.model('skills', skillSchema);

module.exports = ModelClass; 