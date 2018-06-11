require('dotenv').config()
//Main starting point of the application
const express = require('express'),
	  http = require('http'),
	  bodyParser = require('body-parser'),
	  morgan = require('morgan'),
	  app = express(),
	  router = require('./router'),
	  mongoose = require('mongoose'),
	  cors = require('cors'),
	  fileUpload = require('express-fileupload'),
	  passport = require('passport');

// DB Setup
mongoose.connect(process.env.DB, () => {
	console.log("Connected to Job Board Database")
});

//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json({ type:'*/*', limit: "50mb" }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server is running', port);

// process.env.DB

