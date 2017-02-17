var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var fs = require('fs');

// load secret key from file
var SUPERSECRETKEY = fs.readFileSync(__dirname + '/../config/secret');
SUPERSECRETKEY = SUPERSECRETKEY.slice(0, SUPERSECRETKEY.length - 1)

var UserSchema = new mongoose.Schema({
  username: {type:String, lowercase: true, unique: true},
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  // set expiration to 1 day
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 7);

  return jwt.sign({
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, SUPERSECRETKEY);
};

mongoose.model('User', UserSchema);

