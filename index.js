//Main starting point of the application
const express = require('express'),
	  http = require('http'),
	  bodyParser = require('body-parser'),
	  morgan = require('morgan'),
	  app = express(),
	  router = require('./router'),
	  mongoose = require('mongoose'),
	  cors = require('cors'),
	  nodemailer = require('nodemailer');


// DB Setup
mongoose.connect('mongodb://localhost/auth');

//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type:'*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server is running', port);

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'nodemailertest507@gmail.com',
        pass: 'idontcare'
    }
});

const mailOptions = {
  from: 'nodemailertest507@gmail.com', // sender address
  to: 'paulpriester@yaho.com', // list of receivers
  subject: 'Nodemailer test', // Subject line
  html: '<p>Hello Paul!!!!!!</p>'// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});