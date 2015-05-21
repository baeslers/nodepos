var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');
var _ = require('lodash');
var expressJwt = require('express-jwt');
var jwt        = require('jsonwebtoken');



module.exports = function(app){


  var adminRouter = express.Router();

  adminRouter.use(function(req, res, next){
    //add the functionality that they cant be here
      next();
  });

  /*route declarations*/

  adminRouter.get('/', function(req, res){
    res.sendfile('public/admin/admin.html');
  });
  

  adminRouter.post('/items', function(req, res){
    console.log(req.body);
    var item = new Item({
      title: req.body.item.itemname,
      type: req.body.item.type,
      price: req.body.item.price,
      ingrediants: req.body.item.ingredients
    });
    item.save(function(err){
      if (err){
        res.json({message: err});
      } else {
        return res.json({item: item});
      }
    })
  });

  adminRouter.put('/items/:id', function(req, res){
    Item.findByIdAndUpdate(req.params.id, req.body, function(err, item){
      if (err){
        res.json({message: err});
      } else {
        res.json({item: item});
      }
    });
  });

  adminRouter.delete('/items/:id', function(req, res){
    Item.findByIdAndRemove(req.params.id, function(err, item){
      if (err){
        res.json({message: err});
      } else {
        res.json({message: 'item deleted'});
      }
    });
  });


  adminRouter.get('/users', function(req, res){
    User.find({}, function(err, users){
      if (err){
        return res.json({message: err});
      }
      if (!users){
        return res.json({message: 'no users to display'});
      }
      console.log(users);
      res.json({users: users});
    });
  });

  adminRouter.get('/users/:id', function(req, res){
    User.findOne({_id: req.params.id}, function(err, user){
      if (err){
        res.json({message: error});
      } else if (!user){
        res.json({message: 'user with that id doesnt exist'});
      }
      res.json({user: user});     
    });
  });

  adminRouter.post('/users/', function(req, res){
    checkBody(req.body, function(err, status){
      if (!err && status === true){
        var nUser = new User(req.body);
        nUser.save(function(err){
          if (err){
            return res.status(400).json({message: 'could not create user at this time'});
          } else {
            return res.status(200).json({message: 'User created successfully!'});
          }
        });
      }
    });
  });


  adminRouter.put('/users/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
      if (err || !user){res.json({message: 'couldn\'t find user'}); return;}
      console.log(user);
      res.json({user: user});
    });    
  });

  adminRouter.delete('/users/:id', function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
      if (err){
        console.log(err);
        return res.status(402).json({message: 'couldn\'t delete user'});
      } else {
        return res.json({message: 'successfully deleted user'});
      }
    });
  });

  //app.use('/admin', expressJwt({secret: 'hai'}));
  app.use('/admin', adminRouter);
};
