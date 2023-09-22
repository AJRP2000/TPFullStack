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
    let arrayPersonajes = [];
    for(let i = 0; i < listaPersonajes.length; i++){
        arrayPersonajes[i] = {
                                idPersonaje : listaPersonajes[i]._id,
                                nombre: listaPersonajes[i].nombre
                            };
    }

    return arrayPersonajes;
};

module.exports = {getPersonaje, getListaPersonajes}