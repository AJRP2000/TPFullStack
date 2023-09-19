const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
require('dotenv').config();
const PORT = process.env.PORT;
const uri = process.env.DB_URL;

/******/
const UsrController = require('./controllers/user');


mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use(express.json());


http.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});

//Endpoint para hacer login
app.get("/logIn", async (req, res) => {
    const nombre = req.query.nombre;
    const pinNumerico = req.query.pinNumerico;

    let userApproved = await UsrController.getUserByNameAndPassword(nombre, pinNumerico);

    if(userApproved){
        res.status(200).json({ user: userApproved });
    }
    else {
        res.status(401).json({ message: "Login fallo" });
    }
});

//Endpoint para obtener un personaje segun su Id
app.get("/personaje/:id", async (req, res) => {

});

//Endpoint para obtener la lista de ropa superior
app.get("/listaRopaSuperior", async (req, res) => {

});

//Endpoint para obtener una prenda superior segun su Id
app.get("/ropaSuperior/:id", async (req, res) => {

});

//Endpoint para obtener la lista de ropa inferior
app.get("/listaRopaInferior", async (req, res) => {

});

//Endpoint para obtener una prenda inferior segun su Id
app.get("/ropaInferior/:id", async (req, res) => {

});

//Endpoint para obtener la lista de zapatos
app.get("/listaZapatos", async (req, res) => {

});

//Endpoint para obtener los zapatos segun su Id
app.get("/zapatos/:id", async (req, res) => {

});

//Endpoint para subir el personaje del dia
app.post("/personajeCreado/:personajeCreado", async (req, res) => {

});


//Endpoint para obtener los personajes creados previamente por el usuario
app.get("/personajesCreadosPorUser/:idUsuario", async (req, res) => {

});


//Endpoint para obtener los ultimos 5 personajes creados.
app.get("/personajesCreadosRecientemente", async (req, res) => {

});
