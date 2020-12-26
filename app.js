"use strict";
const config = require("./config");
const controllerU = require("./controllers/controllerUsuarios");
const controllerP = require("./controllers/controllerPreguntas");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const fs = require("fs");
const DAOUsuarios = require("./models/DAOUsuarios");

const MySQLStore = new mysqlSession(session);
const sessionStore = new MySQLStore(config.mysqlConfig);
const middlewareSession = session({
    saveUninitialized: false,
    secret: "estheryalex",
    resave: false,
    store: sessionStore
});

// Crear un servidor Express.js
const app = express();
//Crear middleware para la sesión
app.use(middlewareSession);
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
// Crear instancia 
const daoU = new DAOUsuarios(pool);

//Definición del motor y carpeta de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middleware static para recursos en public
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

//Manejadores de ruta
app.use(express.static("public"));

app.get("/", function (request, response) {
    response.redirect("/paginaInicial");
});

//USUARIOS

//Login
app.get("/paginaInicial", function (request, response) {
    response.status(200);
    response.render("paginaInicial", { errorMsg: null });
});

//Logearse
app.post("/paginaInicial", function (request, response, next) {
    daoU.usuarioCorrecto(request.body.email, request.body.password, function (err, result) {
        if (err) {
            //next(err500(err, request, response));
        }
        else {
            if (result) {
                request.session.currentUser = request.body.email;
                response.redirect("/index");
            }
            else {
                response.render("paginaInicial", { errorMsg: "Dirección de correo y/o contraseña no válidos" });
            }
        }
    });
});


//PREGUNTAS y RESPUESTAS

//MEDALLAS

//Middleware control de acceso
// function controlAcceso(request, response, next) {
//     if (request.session.currentUser != undefined) {
//         response.locals.userEmail = request.session.currentUser;
//         next();
//     }
//     else {
//         response.redirect("/login");
//     }
// }

// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});
