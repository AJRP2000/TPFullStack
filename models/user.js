const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usrSchema = new Schema({
	nombre: {
		type: String,
		required: true
	},
	pinNumerico:{
		type: Number,
		required:true
	}
});


const Usr = mongoose.model('usr',usrSchema);
module.exports = Usr;