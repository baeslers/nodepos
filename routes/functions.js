var passport   = require('passport');
var User       = require('mongoose').model('User');
var expressJwt = require('express-jwt');
var jwt        = require('jsonwebtoken');
var _          = require('lodash');
var mailgun    = require('mailgun').Mailgun;
var keys       = require('../config/keys');
var mailer = new mailgun(keys.mailgun.secret);


function sendRegistrationEmail(user, callback){
  mailer.sendText('noreply@localhost.com',
         user.email,
         'Welcome!',
         'We are glad to see you here! Please confirm your email address by visiting http://localhost:3000/api/confirm/'+user._id,
         {'X-Campaign-Id': 'Registration'},
         function(err) {
           if (err){
            console.log('error!');
            console.log(err);
            callback(err);
           } else {
            console.log('success!');
            callback(null);
           }
         });
}


exports.register = function(req, res){
      if (!req.body.userObj){
        return res.json({message: 'dont hack us brah!'});
      } else {
        var userObj = req.body.userObj;
        var u = new User({username: userObj.username, password: userObj.password, address: userObj.address, phonenumber: userObj.phonenumber, birthday: userObj.birthday});
        User.findOne({username: u.username}, function(err, user){
        if(!user){
          u.save(function(err){
              if(err){return res.status(400).json({message: err});}          
              else {
                sendRegistrationEmail(u, function(err){
                  if (!err){
                    return res.json({
                      user: u,
                      message: 'please verify your email address!'
                    }); 
                } else {
                  return res.json({message: 'failed'});
                }
              });  
            }
          });
        }
        else {
          return res.json({message: 'user already exists'});
        }
      });
    }
}

exports.signin = function(req, res){
  passport.authenticate('local-signin', function(err, user, info){
    if (err || !user){
      console.log(info);
      res.json({message: 'couldn\'t authenticate you at this time'});
    } else {
      user.password = undefined;
      var token = jwt.sign(user, 'hai', {expiresInMinutes: 60*5});
      return res.json({token: token});
    }
  })(req, res);
};
