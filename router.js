const Authentication = require('./controllers/authentication');
const Invite = require('./controllers/invite')
const Jobs = require('./controllers/jobs');
const JobsNY = require('./controllers/jobs-ny');
const Case = require('./controllers/createcase');
const fetchCase = require('./controllers/fetchcases');
const fetchAllCases = require('./controllers/fetchallcases');
const fetchUsers = require('./controllers/fetchUsers');
const fetchSkills = require('./controllers/fetchskills');
const fetchProfile = require('./controllers/fetchprofile');
const fetchCaseLength = require('./controllers/caselength');
const shareJobs = require('./controllers/sharejobs');
const updateCase = require('./controllers/updatecase');
const addSkills = require('./controllers/addskills');
const fetchJobs = require('./controllers/fetchjobs');
const fetchOneJob = require('./controllers/fetchonejob');
const fetchOneCase = require('./controllers/fetchonecase');
const searchJobs = require('./controllers/searchjob');
const deleteJob = require('./controllers/deletejob');
const deleteCase = require('./controllers/deletecase');
const deleteSkill = require('./controllers/deleteskill');
const addJob = require('./controllers/addjob');
const csvJob = require('./controllers/csvjobs');
const addUserSkills = require('./controllers/userskills');
const fetchStudents = require('./controllers/users');
const passportService = require('./services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});
const multi = require('connect-multiparty');
const multimiddle = multi();

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Super secret code is 1231234' });
	});
	
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
	app.post('/signupadmin', Authentication.signupAdmin);
	app.post('/forgot', Authentication.forgotPassword);
	app.get('/reset/:tokenId', Authentication.passwordResetMount);
	app.post('/reset/:tokenId', Authentication.passwordReset);
	app.post('/invite', Invite.invite);
	app.post('/addskills', addSkills.Skills)
	app.post('/profile', requireAuth, multimiddle, Authentication.signupDetail);
	app.get('/fetchprofile/:id?', requireAuth, fetchProfile.fetchProfile );
	app.post('/sharejobs/:jobid', shareJobs.shareJobs)
	app.get('/fetchUsers', fetchStudents.fetchStudent);
	app.get('/fetchcaselength', requireAuth, fetchCaseLength.caselength)
	app.get('/fetchJobs', fetchJobs.fetchJob);
 	app.get('/csvJob', csvJob.csvjob);
	app.get('/fetchonejob/:_id', fetchOneJob.fetchOneJob);
	app.get('/fetchonecase/:_id', fetchOneCase.fetchOneCase);
	app.get('/searchJobs/:title?/:location?', searchJobs.searchJob);
	app.post('/addjob', requireAuth, addJob.Jobs);
	app.post('/adduserskills', requireAuth, addUserSkills.skills);
	app.delete('/deletejob/:id', deleteJob.deleteJob);
	app.delete('/deletecase/:id', requireAuth, deleteCase.deleteCase);
	app.delete('/deleteskill/:id', deleteSkill.deleteSkill);
	app.post('/addcase/:id', requireAuth, Case.saveCase);
	app.get('/fetchCase', requireAuth, fetchCase.fetchCase);
	app.get('/fetchallcases', fetchAllCases.fetchCase);
	app.get('/fetchUsers/:search?', fetchUsers.fetchUser);
	app.get('/fetchskills', fetchSkills.fetchSkill)
	app.post('/update/:id', updateCase.updatecase);
}