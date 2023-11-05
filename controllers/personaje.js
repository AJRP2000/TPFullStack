require('mongoose');
const Personaje = require('../models/personaje');

const getPersonaje = async (idPersonaje) => {
    let personaje = await Personaje.findById(idPersonaje);

    if(personaje!= undefined){
        let direccionArchivo = personaje.nombreArchivo;
        return direccionArchivo;
    }
    else
        return null;
    
};

const getListaPersonajes = async() => {
    let listaPersonajes = await Personaje.find();                
    

    return listaPersonajes;
};

module.exports = {getPersonaje, getListaPersonajes}