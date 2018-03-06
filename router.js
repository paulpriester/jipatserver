const Authentication = require('./controllers/authentication');
const Jobs = require('./controllers/jobs');
const fetchJobs = require('./controllers/fetchjobs');
const deleteJob = require('./controllers/deletejob');
const passportService = require('./services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Super secret code is 1231234' });
	});
	
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
	app.post('/invite', Authentication.invite);
	app.put('/profile',  Authentication.signupDetail);
	app.get('/fetchJobs', fetchJobs.fetchJob)
	app.delete('/deletejob/:id', deleteJob.deleteJob)
}