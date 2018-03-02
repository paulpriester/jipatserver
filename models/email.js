const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;


const userSchema = new Schema({
	email: { type: String, lowercase: true },
	name: String 
});


const ModelClass = mongoose.model('invitation', userSchema);

module.exports = ModelClass; 