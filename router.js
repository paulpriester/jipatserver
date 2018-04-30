const Authentication = require('./controllers/authentication');
const Invite = require('./controllers/invite')
const Jobs = require('./controllers/jobs');
const Case = require('./controllers/createcase');
const fetchCase = require('./controllers/fetchcases');
const fetchAllCases = require('./controllers/fetchallcases');
<<<<<<< HEAD
const fetchUsers = require('./controllers/fetchUsers');
=======
const fetchSkills = require('./controllers/fetchskills');
const fetchProfile = require('./controllers/fetchprofile');
>>>>>>> 8132c59615c45ff8932c51de1e0901a8746ee502
const shareJobs = require('./controllers/sharejobs');
const updateCase = require('./controllers/updatecase');
const addSkills = require('./controllers/addskills');
const fetchJobs = require('./controllers/fetchjobs');
const fetchOneJob = require('./controllers/fetchonejob');
const searchJobs = require('./controllers/searchjob');
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
	app.post('/addskills', addSkills.Skills)
	app.post('/profile', requireAuth,  Authentication.signupDetail);
	app.get('/fetchprofile', requireAuth, fetchProfile.fetchProfile )
	app.post('/sharejobs/:jobid', shareJobs.shareJobs)
	app.get('/fetchUsers', fetchStudents.fetchStudent);
	app.get('/fetchJobs', fetchJobs.fetchJob);
	app.get('/fetchonejob/:_id', fetchOneJob.fetchOneJob)
	app.get('/searchJobs/:title?/:location?', searchJobs.searchJob);
	app.post('/addjob', addJob.Jobs);
	app.delete('/deletejob/:id', deleteJob.deleteJob);
	app.delete('/deletecase/:id', requireAuth, deleteCase.deleteCase);
	app.post('/addcase/:id', requireAuth, Case.saveCase);
	app.get('/fetchCase', requireAuth, fetchCase.fetchCase);
	app.get('/fetchallcases', fetchAllCases.fetchCase);
<<<<<<< HEAD
	app.get('/fetchUsers/:search?', fetchUsers.fetchUser);
=======
	app.get('/fetchskills', fetchSkills.fetchSkill)
>>>>>>> 8132c59615c45ff8932c51de1e0901a8746ee502
	app.post('/update/:id', updateCase.updatecase);
}