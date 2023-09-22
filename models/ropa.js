const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ropaSchema = new Schema({
	tipoRopa: {
		type: String,
		required: true
	},
    nombreArchivo : {
        type: String,
        required: true
    }
});


const Ropa = mongoose.model('ropa',ropaSchema);
module.exports = Ropa;