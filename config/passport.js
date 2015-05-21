var mongoose  = require('mongoose');
var User      = mongoose.model('User');
module.exports = function(passport, LocalStrategy){
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function(id, done) {
    User.findOne({
    	_id: id
    }, function (err, user) {
        done(err, user);
    });
  });
  passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, function(username, password, done){
  	   User.findOne({
  	     username: username
  	   }, function(err, user){
  	   	    if (err){
  	   	    	return done(err);
  	   	    }
  	   	    if (!user){
  	   	    	return done(null, false, {
  	   	    		message: 'No username found with that!'
  	   	    	});
  	   	    }
  	   	    if (!user.validPassword(password)){
  	   	    	return done(null, false, {
  	   	    	    message: 'Incorrect password supplied'
  	   	    	});
  	   	    }
  	   	    return done(null, user);
  	   });
  }));
};
