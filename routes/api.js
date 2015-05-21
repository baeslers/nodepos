var express        = require('express');
var mongoose       = require('mongoose');
var functions      = require('./functions');
var User           = mongoose.model('User');
var expressJwt     = require('express-jwt');
var jwt            = require('jsonwebtoken');
var Ingredients    = mongoose.model('Ingredient');
var keys           = require('../config/keys');
var Twitter        = require('twitter');
var Facebook       = require('facebook-node-sdk');
var https          = require('https');
var TwitterClient  = new Twitter(keys.twitter);
var FacebookClient = new Facebook(keys.facebook);



function getTwitterData(callback){
  TwitterClient.get('/search/tweets', {q: 'taterandjoes'}, function(err, data){
    if (!err){callback(null, data);}
    else{callback(err, null);}
  })
};

function generateAccessToken(callback){
  var requestUrl = 'https://graph.facebook.com/oauth/access_token?client_id='+keys.facebook.appID+'&client_secret='+keys.facebook.secret+'&grant_type=client_credentials';
  https.get(requestUrl, function(response){
    response.on('data', function(data){
      var token = data.toString('utf-8').split("access_token=");
      FacebookClient.setAccessToken(token[1]);
      callback();
    });
  }).on('error', function(error){
    console.log(error);
  });
}
generateAccessToken(function(){
  console.log('complete');
});
function getFacebookData(callback){
    FacebookClient.api('/taterandjoes', function(err, result){
      if (err){
        callback(err, null);
      }
      if(result){
        callback(null, result);
      }
    });
  }


function aggregate(req, res){
  getTwitterData(function(err, tweets){
    if (!err){
      getFacebookData(function(err, result){
        if (!err){
          res.json({facebook: result, twitter: tweets});
        } else {
          res.json({message: 'facebook error', error: err});
        }
      });
    } else {
      res.json({message: 'twitter error', error: err});
    }
  });
}


module.exports = function(app){
  var apiRouter = express.Router();

  
  /*this will contain all of the api stuff for customers!*/
  apiRouter.post('/picture', function(req, res){
    var imgBuf = new Buffer(req.body.img);
    writeFile(imgBuf, function(){
    	if (!err){
    	  return res.json({message: 'write successful'});
        }
        else return res.json({message: err});
    });
  });
  apiRouter.get('/social', function(req, res){
    console.log('oy!');
    aggregate(req, res);
  });
  apiRouter.get('/confirm/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
      if (err){
        return res.status(402).json({
          message: 'Uh oh! looks like your account has expired!'
        });
      } else {
        return res.status(200).redirect('/').json({
          message: 'Successfully confirmed your account!'
        });      
      }
    });
  });

  apiRouter.get('/items', function(req, res){
    Item.find({}, function(err, items){
      if (err){
        //handle later
      } else {
        return res.json({
          items: items
        });
      }
    });
  });


  app.use('/api/editor', expressJwt({secret: 'hai'}));
  app.use('/api', apiRouter);
};
