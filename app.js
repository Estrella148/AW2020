"use strict";

const mysql = require("mysql");
const express=require("express");
const app=express();
//contruir path 
const path= require("path");
//Configurar ejs como motor de plantillas:
app.set("view engine", "ejs");
//Definir directorio de plantillas:
app.set("views", path.join(__dirname, "views"));

/*
const config = require("./js/config");
const DAOUsuarios = require("./js/DAOUsuarios");
const DAOPreguntas = require("./DAOPreguntas");
const DAORespuestas = require("./DAORespuestas");
const DAOMedallas = require("./DAOMedallas");
*/

app.use(express.static("public"));
/*Manejadores de ruta*/
app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, "public/html", "paginaInicial.html"))
});

// Crear el pool de conexiones
/*
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});*/

/*Arrancamos el servidor*/
app.listen(3000, function (err) { //puerto, callback(error)
    if (err) {
        console.error("No se pudo inicializar el servidor: " + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});

/*
let daoUsuarios = new DAOUsuarios(pool);
let daoPreguntas = new DAOPreguntas(pool);
let daoRespuestas = new DAORespuestas(pool);
let daoMedallas = new DAOMedallas(pool);
*/
// Definición de las funciones callback:

//USUARIOS

function cb_insertarUsuario(err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Usuario añadido correctamente");
    }
}

//PREGUNTAS

//RESPUESTAS

//MEDALLAS


// daoUsuarios.insertarUsuario("pepe@ucm.es", "123456", "Pepe García", "1.png", cb_insertarUsuario);
// daoUsuarios.insertarUsuario("esther@ucm.es", "estrella", "Esther Peñas", "2.png", cb_insertarUsuario);
// daoUsuarios.insertarUsuario("marina@ucm.es", "aw", "Marina García", "3.png", cb_insertarUsuario);
// daoUsuarios.insertarUsuario("alejandro@ucm.es", "magdalenas", "Alejandro Ruiz", "4.png", cb_insertarUsuario);
// daoUsuarios.insertarUsuario("antonio@ucm.es", "bilbao", "Antonio Navarro", "5.png", cb_insertarUsuario);
// daoUsuarios.insertarUsuario("alberto@ucm.es", "juez", "Alberto Verdejo", "6.png", cb_insertarUsuario);
// daoUsuarios.insertarUsuario("isabel@ucm.es", "juez2", "Isabel Pita", "7.png", cb_insertarUsuario);
// daoUsuarios.insertarUsuario("virginia@ucm.es", "datos", "Virginia Nose", "8.png", cb_insertarUsuario);
// daoUsuarios.insertarUsuario("guille@ucm.es", "333", "Guillermo Garvi", "9.png", cb_insertarUsuario);
// daoUsuarios.insertarUsuario("merche@ucm.es", "pokemon", "Mercedes Herrero", "10.png", cb_insertarUsuario);
