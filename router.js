const Authentication = require('./controllers/authentication');
const Invite = require('./controllers/invite')
const Jobs = require('./controllers/jobs');
const Case = require('./controllers/cases');
const fetchJobs = require('./controllers/fetchjobs');
const deleteJob = require('./controllers/deletejob');
const addJob = require('./controllers/addjob')
const fetchStudents = require('./controllers/users');
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
	app.post('/invite', Invite.invite);
	app.post('/profile',  Authentication.signupDetail);
	app.get('/fetchJobs', fetchJobs.fetchJob);
	app.post('/addjob', addJob.Jobs);
	app.get('/fetchUsers', fetchStudents.fetchStudent);
	app.delete('/deletejob/:id', deleteJob.deleteJob);
	app.post('/case', Case.cases);
}