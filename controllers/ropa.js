require('mongoose');
const Ropa = require('../models/ropa');

const getListaRopaSuperior = async() => {
    let listaRopaSuperior = await Ropa.find({tipoRopa: "Ropa Superior"});

    return listaRopaSuperior;
};

const getListaRopaInferior = async() => {
    let listaRopaInferior = await Ropa.find({tipoRopa: "Ropa Inferior"});

    return listaRopaInferior;
};

const getListaZapatos = async() => {
    let listaZapatos = await Ropa.find({tipoRopa: "Zapato"});

    return listaZapatos;
};

const getRopa = async (idRopa) => {
    let ropa = await Ropa.findById(idRopa);

    if(ropa!= undefined){
        let direccionArchivo = ropa.nombreArchivo;
        return direccionArchivo;
    }
    else
        return null;
    
}; 


module.exports = {getListaRopaSuperior, getListaRopaInferior, getListaZapatos, getRopa}