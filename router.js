const Authentication = require('./controllers/authentication');
const Invite = require('./controllers/invite')
const Jobs = require('./controllers/jobs');
const Case = require('./controllers/createcase');
const fetchCase = require('./controllers/fetchcases');
const fetchAllCases = require('./controllers/fetchallcases');
const updateCase = require('./controllers/updatecase');
const fetchJobs = require('./controllers/fetchjobs');
const deleteJob = require('./controllers/deletejob');
const deleteCase = require('./controllers/deletecase');
const addJob = require('./controllers/addjob');
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
	app.post('/signupadmin', Authentication.signupAdmin);
	app.post('/invite', Invite.invite);
	app.post('/profile', requireAuth,  Authentication.signupDetail);
	app.get('/fetchUsers', fetchStudents.fetchStudent);
	app.get('/fetchJobs', fetchJobs.fetchJob);
	app.post('/addjob', addJob.Jobs);
	app.delete('/deletejob/:id', deleteJob.deleteJob);
	app.delete('/deletecase/:id', requireAuth, deleteCase.deleteCase);
	app.post('/addcase/:id', requireAuth, Case.saveCase);
	app.get('/fetchCase', requireAuth, fetchCase.fetchCase);
	app.get('/fetchallcases', fetchAllCases.fetchCase);
	app.post('/update/:id', updateCase.updatecase);
}