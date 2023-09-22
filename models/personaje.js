const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personajeSchema = new Schema({
	nombre: {
		type: String,
		required: true
	},
    nombreArchivo : {
        type: String,
        required: true
    }
});


const Personaje = mongoose.model('personaje',personajeSchema);
module.exports = Personaje;