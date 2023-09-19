require('mongoose');
const Usr = require('../models/user');


const addUser = async (nombre, pinNumerico) => {

    let existUser = await Usr.findOne({ nombre: nombre });
    console.log(existUser);
    if(!existUser) {        
        const usr = new Usr(
            {              
                nombre: nombre,
                pinNumerico:pinNumerico
            }
        );

        let user = await usr.save(); 
        console.log("Usuario nuevo");
        console.log(user);
        return { user }; 

    }else{
        return false;
    }
}   

const getAllUsers = async (limit,offset) => {

    const users = await Usr.find({}).limit(limit).skip(offset);

    return users;
}

const getUser = async(id) => {

    const user = await Usr.findById(id);

    // await Usr.findOne({ _id: req.params.id })

    return user;
}

const deleteUser = async(id) => {

    const result = await Usr.findByIdAndDelete(id);

    return result;
}

const getUserByNameAndPassword = async (nombre, pinNumerico) => {
    let user = await Usr.findOne({ nombre: nombre , pinNumerico: pinNumerico});
    if(user!= undefined) {  
        return user;

    }else{
        return false;
    }


}

module.exports = { addUser, getAllUsers, getUser, deleteUser, getUserByNameAndPassword }