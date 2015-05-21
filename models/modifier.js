var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var modifierschema = new Schema({
	upMod: Number,
	downMod: Number
});


module.exports = mongoose.model('Modifier', modifierschema);