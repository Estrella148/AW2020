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
const multer = require("multer");
const multerFactory = multer({ dest: path.join(__dirname, "profile_imgs") });
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
        response.redirect("/paginaPrincipal");
    } else {
        response.status(200);
        response.render("paginaInicial", { errorMsg: null });
    }
});
app.post("/paginaInicial", controllerU.logearse);

//Crear Cuenta
app.get("/crearCuenta", function (request, response, next) {
    if (request.session.currentUser) {
        response.redirect("/paginaPrincipal");
    } else {
        response.status(200);

        response.render("crearCuenta", { errorMsg: null });
    }
});

//Pagina principal
app.get("/paginaPrincipal", controlAcceso, controllerU.paginaPrincipal);

//Perfil Usuario
app.get("/perfilUsuario/:id", controlAcceso, controllerU.controlAccesoDatosUsuario, controllerU.datosUsuario);

//Insertar usuario
app.post("/crearCuenta", multerFactory.single("img"), controllerU.crearCuenta);

//Imagenes de Perfil
app.get("/imagenUsuario/:id?", controlAcceso, controllerU.imagenPerfil);

//Buscar Usuario
app.get("/busquedaUsuario", controlAcceso, controllerU.controlAccesoDatosUsuario, controllerU.buscarUsuario);

//Mostrar todas las preguntas
app.get("/preguntas", controlAcceso, controllerU.controlAccesoDatosUsuario, cAPreguntas, controllerP.mostrarTodas);
   
//Formular Pregunta
app.get("/formularPregunta", controlAcceso, controllerU.controlAccesoDatosUsuario, function (request, response, next) {
    response.status(200);
    response.render("formularPregunta", { errorMsg: null });
});

app.post("/formularPregunta", controllerU.controlAccesoDatosUsuario,controllerP.formularPregunta);

//Filtrar por texto
app.post("/preguntasText", controlAcceso, controllerU.controlAccesoDatosUsuario, cAPreguntasText, controllerP.filtroTexto);

//Filtrar por etiqueta
app.get("/preguntasEtiqueta/:id", controlAcceso, controllerU.controlAccesoDatosUsuario, cAPreguntasEtiqueta,controllerP.filtroEtiqueta);
app.post("/preguntasEtiqueta/preguntasText", controlAcceso, controllerU.controlAccesoDatosUsuario, cAPreguntasText,controllerP.filtroTexto);

//Preguntas sin responder
app.get("/preguntasSinResponder", controlAcceso, controllerU.controlAccesoDatosUsuario, cAPreguntasSinResponder, controllerP.mostrarPreguntasSinResponder);

//Info Pregunta
app.get("/infoPregunta/:id", controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.infoP);

//Formular respuesta
app.post("/infoPregunta",controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.formularRespuesta);

//Votos
app.post("/votosPregunta",controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.actualizarVotos);
app.post("/votosRespuesta",controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.actualizarVotosRespuesta);


//Desconectar
app.get("/cerrarSesion", controlAcceso, function (request, response, next) {
    request.session.destroy();
    response.redirect("/paginaInicial");
})

//Middleware control de acceso
function controlAcceso(request, response, next) {
    if (request.session.currentUser != undefined) {
        response.locals.userEmail = request.session.currentUser;
        next();
    }
    else {
        response.redirect("/paginaInicial");
    }
}


function cAPreguntas(request, response, next) {
    response.locals.msg = "Todas las preguntas";
    next();
}

function cAPreguntasSinResponder(request, response, next) {
    response.locals.msg = "Preguntas sin responder";
    next();
}

function cAPreguntasText(request, response, next) {
    response.locals.msg = "Resultados de la búsqueda ''" + request.body.buscador+ "''";
    next();
}


function cAPreguntasEtiqueta(request, response, next) {
    response.locals.msg = "Preguntas con la etiqueta ["+request.params.id+"]";
    next();
}

//Manejadores de ruta para errores
app.use(err404);
app.use(err500);

function err404(request, response) {
    response.status(404);
    response.render("error404", { url: request.url });
}

function err500(error, request, response, next) {
    response.status(500);
    response.render("error500", {
        mensaje: error.message
    });
}

// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});
