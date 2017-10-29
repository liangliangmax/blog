var mongoose = require('mongoose');

var userSchema = require('../schemas/userschema');



module.exports = mongoose.model('User',userSchema);