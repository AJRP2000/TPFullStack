require('mongoose');
const PersonajeGuardado = require('../models/personajeGuardado');
const Personaje = require('../models/personaje');
const Ropa = require('../models/ropa');

const guardarPersonaje = async (personajeGuardado) => {
    let archivoPersonaje = await _validarPersonaje(personajeGuardado.idPersonaje);
    let archivoRopaSuperior = await _validarRopa(personajeGuardado.idRopaSuperior, "Ropa Superior");
    let archivoRopaInferior = await _validarRopa(personajeGuardado.idRopaInferior, "Ropa Inferior");
    let archivoZapatos = await _validarRopa(personajeGuardado.idZapatos, "Zapato");
    let isFechaValida = await validarPersonajeDelDia(personajeGuardado.nombreUsuario);

    if(archivoPersonaje && archivoRopaSuperior && archivoRopaInferior && archivoZapatos && isFechaValida){
        const personajeObjeto = new PersonajeGuardado(
            {
                nombreUsuario : personajeGuardado.nombreUsuario,
                idPersonaje : personajeGuardado.idPersonaje,
                archivoPersonaje : archivoPersonaje,
                idRopaSuperior : personajeGuardado.idRopaSuperior,
                archivoRopaSuperior : archivoRopaSuperior,
                idRopaInferior : personajeGuardado.idRopaInferior,
                archivoRopaInferior: archivoRopaInferior,
                idZapatos : personajeGuardado.idZapatos,
                archivoZapatos : archivoZapatos,
                fechaCreacion : new Date()
            }
        );
        await personajeObjeto.save();        
    }
    else
        throw new Error("No se pudo guardar el personaje.");
    
};

const getPersonajesUsuario = async(nombreUsuario, limit, offset) => {
    const personajes = await PersonajeGuardado.find({nombreUsuario : nombreUsuario}).limit(limit).skip(offset);
    return personajes;
};

const getPersonajesCreadosRecientemente = async () => {
    let arrayPersonajesGuardados = await PersonajeGuardado.find();

    //Sortea el array en orden descendiente segun la fecha Creacion
    arrayPersonajesGuardados.sort((a, b) => b.fechaCreacion - a.fechaCreacion);

    //Crea un array con solo los primeros 5 records.
    const arrayPersonajesRecientes = arrayPersonajesGuardados.slice(0,5);

    return arrayPersonajesRecientes;
};

const _validarPersonaje = async (idPersonaje) => {
    let personaje = await Personaje.findById(idPersonaje)
    if(personaje != undefined)
        return personaje.nombreArchivo;
    else
        throw new Error("No se pudo encontrar el personaje.");
};

const _validarRopa = async (idRopa, tipoRopa) => {
    let ropa = await Ropa.findOne({_id: idRopa, tipoRopa: tipoRopa});
    if(ropa != undefined)
        return ropa.nombreArchivo;
    else  
        throw new Error("No se pudo encontrar: " + tipoRopa);
};

const validarPersonajeDelDia = async (nombreUsuario) => {
    const arrayPersonajesGuardadosUsuario = await PersonajeGuardado.find({nombreUsuario: nombreUsuario});
    let validarFecha = true;
    for (const item of arrayPersonajesGuardadosUsuario) {
        const inputDate = new Date(item.fechaCreacion);
        const currentDate = new Date();
        
            // Valida si los componentes de la fecha (dia, mes, anio) son los mismos
        const isSameDay = (
            inputDate.getDate() === currentDate.getDate() &&
            inputDate.getMonth() === currentDate.getMonth() &&
            inputDate.getFullYear() === currentDate.getFullYear()
        );      

        if(isSameDay)
            throw new Error("Este usuario ya creo un personaje hoy.")
    }
    return validarFecha;
};

module.exports = {guardarPersonaje, getPersonajesUsuario, getPersonajesCreadosRecientemente}