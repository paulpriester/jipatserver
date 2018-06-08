const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  bcrypt = require('bcrypt-nodejs');




// Define our model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
	image: String,
	firstName:  String,
	lastName:  String,
	about:  String,
	portfolio: String,
	github: String,
	linkedin: String,
	resume: String,
	careergoals: String,
	dateCreated: Date,
	admin: {type: Boolean, default: false},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	admin: {type: Boolean, default: false},
	skills: {type: []}
});



// On save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
	// get access to the user model
	const user = this;

	// generate a salt then run callback
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {return next(err);}

		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) { return next(err); }

			// overwrite plain text password with encrypted password
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) { return callback(err); }

			callback(null, isMatch);
	});
}

// Create the model class   
module.exports = mongoose.model('user', userSchema);
