var express = require('express');
var multer = require('multer');
module.exports = function(app, morgan, bodyParser, session, cookieParser, passport, mongoose, MongoStore){
  //log the user object if it exists
  var sessionstore = new MongoStore({mongooseConnection: mongoose.connection});
  //configure parts of the application
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true})); //x-www-url-encoded
  app.use(bodyParser.json()); //read req.body as json
  app.use(session({secret: 'sessionSecretIsSHHH', saveUninitialized: false, resave: false, store: sessionstore}));
  app.use(multer({dest: './uploads/'}));
  app.use(passport.initialize());
  app.use(passport.session());
};



