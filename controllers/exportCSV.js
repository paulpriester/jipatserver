const csv = require('csv-express');
const email = require('../models/email')

exports.exportCSV = function(req,res){
    
    let fileName = "exports.csv"
	let dataArray

    email.find({}, function(err, emails){

        if(err){

            res.send(err)
        }

        else{

            res.statusCode = 200;

			res.setHeader('Content-Type', 'text/csv');

			res.setHeader("Content-Disposition", 'attachment; filename='+filename);

			res.csv(email, true);
        }

    })
}