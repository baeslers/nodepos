var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var functions = require('./functions');
var passport = require('passport');
var crypto = require('crypto');

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');


module.exports = function(app, passport){


  var authRouter = express.Router();
  /*this seems a little too complex just for bruteforce protection*/
  authRouter.use(function(req, res, next){
    if (!req.session.loginAttempts){
      req.session.loginAttempts = 0;
    }
    if (req.path === '/signin'){
      req.session.loginAttempts += 1;
      var b = new Date();
      if (!req.session.lastAttempt){
        var d = new Date();
        req.session.lastAttempt = d.getHours();
        return next();
      }  
      if (req.session.loginAttempts >= 10){
        var d = new Date();
        req.session.lastAttempt = d.getHours();        
        var last = req.session.lastAttempt;
        var current = b.getHours();
        if (last - current <= 1 ){
          next();
        } else {
          res.json({message: 'you are temporarily barred from logging in'});
        }
      } else {
        req.session.loginAttempts += 1;
        req.session.lastAttempt = new Date();
        next();
      }
    } else {
      next();
    }
  });

  /*route declarations*/

  authRouter.get('*', function(req, res){
    res.redirect('/'); //don't allow to get any page... were all auth here.
  });

  authRouter.post('/register', functions.register);
  authRouter.post('/signin', functions.signin);
  authRouter.post('/change', function(req, res){
    if (req.headers.authorization){
      var who = jwt.verify(req.headers.authorization.split("Bearer ").join(""), 'hai');
      
    } else {
      return res.json({message: 'you are not authorized'});
    }
  });
  app.use('/auth', authRouter);


};
