const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personajeGuardadoSchema = new Schema({
	nombreUsuario: {
		type: String,
		required: true
	},
	idPersonaje: {
		type: ObjectId,
		required: true
	},
	idRopaSuperior:{
		type: ObjectId,
		required:true
	},
    idRopaInferior:{
		type: ObjectId,
		required:true
	},
    idZapatos:{
		type: ObjectId,
		required:true
	},
    fechaCreacion: {
        type: Date,
        required:true
    }
});


const PersonajeGuardado = mongoose.model('personajeGuardado',personajeGuardadoSchema);
module.exports = PersonajeGuardado;