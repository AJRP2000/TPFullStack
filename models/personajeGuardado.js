const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personajeGuardadoSchema = new Schema({
	nombreUsuario: {
		type: String,
		required: true
	},
	idRopaSuperior:{
		type: Number,
		required:true
	},
    idRopaInferior:{
		type: Number,
		required:true
	},
    idZapatos:{
		type: Number,
		required:true
	},
    fechaCreacion: {
        type: Date,
        required:true
    }
});


const PersonajeGuardado = mongoose.model('personaje',personajeGuardadoSchema);
module.exports = PersonajeGuardado;