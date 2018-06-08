const User = require('../models/user');

exports.uploadImage = function(req, res) {
  console.log(req.body)
  console.log(req.user)

  req.user.image = req.body.image
  req.user.save((err, updated)=>{

  res.send(updated)

  })
}