var square_client    = require('square-connect');
var mongoose         = require('mongoose');
var keys             = require('../config/keys');
var express          = require('express');
var Ingredients      = mongoose.model('Ingredient');


//bootstrap the response object (as in the third param) to send data

function data_handler(err, resp, res){
	if (err){
		res.json(err);
	} else {
		console.log(resp.data);
		res.json(resp);
	}
}
function convert_to_cents(obj, callback){
	var self = obj;
	self.variations.price_money.amount = (obj.variations.price_money.amount*100);
  callback(self);
}

module.exports = function(app){
  var squareRouter = express.Router();
  var square = new square_client(keys.square.key);
  

  squareRouter.get('/ingredients', function(req, res){
    square.api('/me/inventory', function(err, resp){
      data_handler(err, resp, res);
    });
  });

  squareRouter.post('/ingredients', function(req, res){
    var ingredient = new Ingredients({name: req.body.name, upMod: parseFloat(req.body.upMod), downMod: parseFloat(req.body.downMod)});
    ingredient.save(function(err){
        if (err){
          return res.json(err);
        } else {
          return res.json(ingredient);
        }
    });
  });

  squareRouter.get('/info', function(req, res){
    square.api('me', function(err, resp){
    	data_handler(err, resp, res);
    });
  });
  squareRouter.get('/items', function(req, res){
  	square.api('me/items', function(err, resp){
  		data_handler(err, resp, res);
  	});
  });
  squareRouter.post('/item', function(req, res){
  	var mods = req.body.mods;
  	//go to database
  	console.log(req.body);
  	convert_to_cents(req.body.item, function(item){
    	square.api('/me/items', 'POST', item, function(err, resp){
    		data_handler(err, resp, res);
  	    });
  	});
  });

  squareRouter.post('/order', function(req, res){
  	console.log(req.body);
  });

  app.use('/square', squareRouter);
}