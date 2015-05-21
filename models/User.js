var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var crypto   = require('crypto');

//username handle schema for sm
var HandleSchema = new Schema({
  username: String,
  provider: String
});

var UserSchema = new Schema({
  accessLevel: Number,
  username: String,
  salt: String,
  password: String,
  address: String,
  email: String, 
  phonenumber: String,
  birthday: String,
  handles: [{type: Schema.Types.ObjectId}]
});

UserSchema.pre('save', function(next){
  if(this.password && this.password.length > 6){
  	this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
  	this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.validPassword = function(password){
	return (this.password === this.hashPassword(password));
};

UserSchema.methods.hashPassword = function(password){
  if (this.salt && password){
  	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  } else {
  	return password;
  }
};


module.exports = mongoose.model('User', UserSchema);
