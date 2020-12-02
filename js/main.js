"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsuarios = require("./DAOUsuarios");
const DAOPreguntas = require("./DAOPreguntas");
const DAORespuestas = require("./DAORespuestas");
const DAOMedallas = require("./DAOMedallas");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUsuarios = new DAOUsuarios(pool);
let daoPreguntas = new DAOPreguntas(pool);
let daoRespuestas = new DAORespuestas(pool);
let daoMedallas = new DAOMedallas(pool);

// Definición de las funciones callback:

//USUARIOS

//PREGUNTAS

//RESPUESTAS

//MEDALLAS


