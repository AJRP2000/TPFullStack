require('mongoose');
const Ropa = require('../models/ropa');

const getListaRopaSuperior = async() => {
    let listaRopaSuperior = await Ropa.find({tipoRopa: "Ropa Superior"});
    let arrayRopaSuperior = [];
    for(let i = 0; i < listaRopaSuperior.length; i++){
        arrayRopaSuperior[i] = {
                                idRopa: listaRopaSuperior[i]._id,
                                tipoRopa: listaRopaSuperior[i].tipoRopa
                            };
    }

    return arrayRopaSuperior;
};

const getListaRopaInferior = async() => {
    let listaRopaInferior = await Ropa.find({tipoRopa: "Ropa Inferior"});
    let arrayRopaInferior = [];
    for(let i = 0; i < listaRopaInferior.length; i++){
        arrayRopaInferior[i] = {
                                idRopa: listaRopaInferior[i]._id,
                                tipoRopa: listaRopaInferior[i].tipoRopa
                            };
    }

    return arrayRopaInferior;
};

const getListaZapatos = async() => {
    let listaZapatos = await Ropa.find({tipoRopa: "Zapato"});
    let arrayZapatos = [];
    for(let i = 0; i < listaZapatos.length; i++){
        arrayZapatos[i] = {
                                idRopa: listaZapatos[i]._id,
                                tipoRopa: listaZapatos[i].tipoRopa
                            };
    }

    return arrayZapatos;
};

const getRopa = async (idRopa) => {
    let ropa = await Ropa.findOne({ _id: idRopa });

    if(ropa!= undefined){
        let direccionArchivo = ropa.nombreArchivo;
        return direccionArchivo;
    }
    else
        return null;
    
}; 


module.exports = {getListaRopaSuperior, getListaRopaInferior, getListaZapatos, getRopa}