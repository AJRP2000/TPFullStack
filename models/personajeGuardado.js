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
	archivoPersonaje: {
		type: String,
		required: true
	},
	idRopaSuperior:{
		type: ObjectId,
		required:true
	},
	archivoRopaSuperior: {
		type: String,
		required: true
	},
    idRopaInferior:{
		type: ObjectId,
		required:true
	},
	archivoRopaInferior: {
		type: String,
		required: true
	},
    idZapatos:{
		type: ObjectId,
		required:true
	},
	archivoZapatos: {
		type: String,
		required: true
	},
    fechaCreacion: {
        type: Date,
        required:true
    }
});


const PersonajeGuardado = mongoose.model('personajeGuardado',personajeGuardadoSchema);
module.exports = PersonajeGuardado;