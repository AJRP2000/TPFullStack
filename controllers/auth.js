require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');

const login = async(nombre,pinNumerico) => {

    const  result = await Usr.findOne({ nombre: nombre, pinNumerico:pinNumerico })
    
    if (result){
            const token = jwt.sign(result.toJSON(), "fgdgbrfeer6g1df23g86ef2gs", { expiresIn : 3600 }); //Expira en 1 hora
            let jsonUsuario = {usuario: result, token: token};
            return jsonUsuario;
    }
    return null; // retorno 

}

module.exports = {login}