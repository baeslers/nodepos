var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var modiferschema = new Schema({
	upMod: Number,
	downMod: Number
});

var IngredientSchema = new Schema({
	name: String,
	upMod: Number,
	downMod: Number
});


module.exports = mongoose.model('Ingredient', IngredientSchema);