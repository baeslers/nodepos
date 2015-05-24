var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = function(app){

  /*declare our routers*/
  var mainRouter = express.Router();
  /*declare middlewares*/
  mainRouter.use(function(req, res, next){
    console.log(req.cookies);
    next();
  });
  

  mainRouter.get('/', function(req, res){
    res.sendfile('public/core/index.html');
  });
  mainRouter.get('/blah', function(req, res){

  });

  mainRouter.get('/upload', function(req, res){
    console.log(req.body);
    console.log(req.files);
  });


  /*bootstrap to app*/

  app.use('/', mainRouter);

};
