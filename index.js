const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const path = require('path'); 
const cors = require("cors"); // Require the 'cors' package

require('dotenv').config();
const PORT = process.env.PORT;
const uri = process.env.DB_URL;

/***Instanciar Controllers***/
const PersonajeController = require('./controllers/personaje');
const RopaController = require('./controllers/ropa');
const PersonajeGuardadoController = require('./controllers/personajeGuardado');
const AuthController = require('./controllers/auth');

const Middleware = require('./middleware/auth-middleware');

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

http.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});

/***Endpoints***/

//Endpoint para hacer login
app.get("/logIn", async (req, res) => {
    const nombre = req.query.nombre;
    const pinNumerico = req.query.pinNumerico;

    let userApproved = await AuthController.login(nombre, pinNumerico);

    if(userApproved){
        res.status(200).json(userApproved);
    }
    else {
        res.status(401).json({ message: "Login fallo" });
    }
});

//Endpoint para obtener la lista de personajes
app.get("/listaPersonajes", async(req,res) => {
    try {
        const listaPersonajes = await PersonajeController.getListaPersonajes();
        if(listaPersonajes.length > 0){
            res.status(200).json(listaPersonajes);
        } else{
            throw new Error("No se encontraron personajes en la base de datos.");
        }
    } catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
})

//Endpoint para obtener la lista de ropa superior
app.get("/listaRopaSuperior", async (req, res) => {
    try {
        const listaRopaSuperior = await RopaController.getListaRopaSuperior();
        if(listaRopaSuperior.length > 0){
            res.status(200).json(listaRopaSuperior);
        } else{
            throw new Error("No se encontro ropa superior en la base de datos");
        }
    } catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
});

//Endpoint para obtener la lista de ropa inferior
app.get("/listaRopaInferior", async (req, res) => {
    try {
        const listaRopaInferior = await RopaController.getListaRopaInferior();
        if(listaRopaInferior.length > 0){
            res.status(200).json(listaRopaInferior);
        } else{
            throw new Error("No se encontro ropa inferior en la base de datos");
        }
    } catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
});


//Endpoint para obtener la lista de zapatos
app.get("/listaZapatos", async (req, res) => {
    try{
        const listaZapatos = await RopaController.getListaZapatos();
        if(listaZapatos.length > 0){
            res.json(listaZapatos);
        } else{
            throw new Error("No se encontraron zapatos en la base de datos");
        }
    } catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
});

//Endpoint para obtener un personaje segun su Id
app.get("/personaje", async (req, res) => {
    try{
        const idPersonaje = req.query.idPersonaje;

        let direccionArchivo = await PersonajeController.getPersonaje(idPersonaje);
        if(direccionArchivo!=null){
            res.status(200).json(direccionArchivo);
        }
        else {
            throw new Error("Personaje no encontrado.");
        }
    } catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
});

//Endpoint para obtener una prenda superior segun su Id
app.get("/ropaSuperior", async (req, res) => {
    try{
        const idRopa = req.query.idRopa;
        let direccionArchivo = await RopaController.getRopa(idRopa);
        if(direccionArchivo!=null){
            res.status(200).json(direccionArchivo);
        }
        else {
            throw new Error("Ropa Superior no encontrada.");
        }
    } catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
});

//Endpoint para obtener una prenda inferior segun su Id
app.get("/ropaInferior", async (req, res) => {
    try{
        const idRopa = req.query.idRopa;
        let direccionArchivo = await RopaController.getRopa(idRopa);
        if(direccionArchivo!=null){
            res.status(200).json(direccionArchivo);
        }
        else {
            throw new Error("Ropa Inferior no encontrada.");
        }
    } catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
});

//Endpoint para obtener los zapatos segun su Id
app.get("/zapatos", async (req, res) => {
    try {
        const idRopa = req.query.idRopa;
        let direccionArchivo = await RopaController.getRopa(idRopa);
        if(direccionArchivo!=null){
            res.status(200).json(direccionArchivo);
        }
        else {
            throw new Error("Zapatos no encontrados.");
        }
    } catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
});

//Endpoint para subir el personaje del dia
app.post("/guardarPersonaje", Middleware.verify, async (req, res) => {
    try{
        const personajeGuardado = {
                                    nombreUsuario: req.query.nombreUsuario,
                                    idPersonaje : req.query.idPersonaje,
                                    idRopaSuperior: req.query.idRopaSuperior,
                                    idRopaInferior: req.query.idRopaInferior,
                                    idZapatos: req.query.idZapatos
                                };
        await PersonajeGuardadoController.guardarPersonaje(personajeGuardado);
        res.status(200).json({message: "Personaje creado con exito."});
    } catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
});


//Endpoint para obtener los personajes creados previamente por el usuario
app.get("/personajesCreadosPorUser", Middleware.verify, async (req, res) => {
    try{
        const nombreUsuario = req.query.nombreUsuario;
        const limit = req.query.limit;
        const offset = req.query.offset;
        let personajesUsuario = await PersonajeGuardadoController.getPersonajesUsuario(nombreUsuario,limit,offset);
        res.status(200).json(personajesUsuario);
    }catch(error){
        res.status(401).json({message: "Ha ocurrido un error: "+ error.message});
    }
});


//Endpoint para obtener los ultimos 5 personajes creados.
app.get("/personajesCreadosRecientemente", async (req, res) => {
    try{
        let personajesRecientes = await PersonajeGuardadoController.getPersonajesCreadosRecientemente();
        res.status(200).json(personajesRecientes);
    }catch(error){
        res.status(401).json({message: "Ha ocurrido un error: " + error.message});
    }

});
