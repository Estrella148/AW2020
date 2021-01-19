"use strict";
const config = require("./config");
const routerU = require("./routers/routerUsuario");
const routerP = require("./routers/routerPregunta");
const middlewareError = require("./middleware/middlewareError");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
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

//Definición del motor y carpeta de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middleware static para recursos en public
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

//MANEJADORES DE RUTA:
app.use(express.static("public"));

app.get("/", function (request, response) {
    response.redirect("/paginaInicial");
});

//Pagina inicial (logearse)
app.get("/paginaInicial", function (request, response, next) {

    if (request.session.currentUser) {
        response.redirect("/pregunta/preguntasUsuario");
    } else {
        response.status(200);
        response.render("paginaInicial", { errorMsg: null });
    }
});

//Routers
app.use("/usuario", routerU);
app.use("/pregunta", routerP);


//Manejadores de ruta para errores
app.use(middlewareError.err404);
app.use(middlewareError.err500);


// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});
