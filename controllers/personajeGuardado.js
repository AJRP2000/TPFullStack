require('mongoose');
const PersonajeGuardado = require('../models/personajeGuardado');
const Personaje = require('../models/personaje');
const Ropa = require('../models/ropa');

const guardarPersonaje = async (personajeGuardado) => {
    let isPersonajeValido = await _validarPersonaje(personajeGuardado.idPersonaje);
    let isRopaSuperiorValida = await _validarRopa(personajeGuardado.idRopaSuperior, "Ropa Superior");
    let isRopaInferiorValida = await _validarRopa(personajeGuardado.idRopaInferior, "Ropa Inferior");
    let isZapatosValido = await _validarRopa(personajeGuardado.idZapatos, "Zapato");
    let isFechaValida = await _validarPersonajeDelDia(personajeGuardado);

    if(isPersonajeValido && isRopaSuperiorValida && isRopaInferiorValida && isZapatosValido && isFechaValida){
        const personajeObjeto = new PersonajeGuardado(
            {
                nombreUsuario : personajeGuardado.nombreUsuario,
                idPersonaje : personajeGuardado.idPersonaje,
                idRopaSuperior : personajeGuardado.idRopaSuperior,
                idRopaInferior : personajeGuardado.idRopaInferior,
                idZapatos : personajeGuardado.idZapatos,
                fechaCreacion : new Date()
            }
        );
        await personajeObjeto.save();        
    }
    else
        throw new Error("No se pudo guardar el personaje.");
    
};

const _validarPersonaje = async (idPersonaje) => {
    let personaje = await Personaje.findById(idPersonaje)
    if(personaje != undefined)
        return true;
    else
        throw new Error("No se pudo encontrar el personaje.");
}

const _validarRopa = async (idRopa, tipoRopa) => {
    let ropa = await Ropa.findOne({_id: idRopa, tipoRopa: tipoRopa});
    if(ropa != undefined)
        return true;
    else  
        throw new Error("No se pudo encontrar: " + tipoRopa);
}

const _validarPersonajeDelDia = async (personajeGuardado) => {
    const personajeGuardadosUsuario = await PersonajeGuardado.find({nombreUsuario: personajeGuardado.nombreUsuario});
    let validarFecha = true;
    for (const item of personajeGuardadosUsuario) {
        const inputDate = new Date(parseInt(item.fechaCreacion, 10));
        const currentDate = new Date();
        
            // Valida si los componentes de la fecha (dia, mes, anio) son los mismos
        const isSameDay = (
            inputDate.getDate() === currentDate.getDate() &&
            inputDate.getMonth() === currentDate.getMonth() &&
            inputDate.getFullYear() === currentDate.getFullYear()
        );      

        if(isSameDay)
            validarFecha = false;
    }
    return validarFecha;
}

module.exports = {guardarPersonaje}