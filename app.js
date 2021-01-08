"use strict";
const config = require("./config");

const controllerU = require("./controllers/controllerUsuarios");
const controllerP = require("./controllers/controllerPreguntas");
const middlewares = require("./middleware/middlewares");
const middlewareError = require("./middleware/middlewareError");
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
app.get("/paginaPrincipal", middlewares.controlAcceso, controllerU.paginaPrincipal);

//Perfil Usuario
app.get("/perfilUsuario/:id", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerU.datosUsuario);

//Insertar usuario
app.post("/crearCuenta", multerFactory.single("img"), controllerU.crearCuenta);

//Imagenes de Perfil
app.get("/imagenUsuario/:id?", middlewares.controlAcceso, controllerU.imagenPerfil);

//Buscar Usuario
app.get("/busquedaUsuario", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerU.buscarUsuario);

//Mostrar todas las preguntas
app.get("/preguntas", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntas, controllerP.mostrarTodas);
   
//Formular Pregunta
app.get("/formularPregunta", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, function (request, response, next) {
    response.status(200);
    response.render("formularPregunta", { errorMsg: null });
});

app.post("/formularPregunta", controllerU.controlAccesoDatosUsuario,controllerP.formularPregunta);

//Filtrar por texto
app.post("/preguntasText", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasText, controllerP.filtroTexto);

//Filtrar por etiqueta
app.get("/preguntasEtiqueta/:id", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasEtiqueta,controllerP.filtroEtiqueta);
app.post("/preguntasEtiqueta/preguntasText", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasText,controllerP.filtroTexto);

//Preguntas sin responder
app.get("/preguntasSinResponder", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasSinResponder, controllerP.mostrarPreguntasSinResponder);

//Info Pregunta
app.get("/infoPregunta/:id", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.infoP);

//Formular respuesta
app.post("/infoPregunta",middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.formularRespuesta);

//Votos
app.post("/votosPregunta",middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.actualizarVotos);
app.post("/votosRespuesta",middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.actualizarVotosRespuesta);

//Filtro Usuarios
app.post("/filtrarUsuario", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasText, controllerU.filtroUsuario);

//Desconectar
app.get("/cerrarSesion", middlewares.controlAcceso, function (request, response, next) {
    request.session.destroy();
    response.redirect("/paginaInicial");
})



//Manejadores de ruta para errores
app.use(middlewareError.err404);
app.use(middlewareError.err500);

app.use(middlewares.controlAcceso);
app.use(middlewares.cAPreguntas);
app.use(middlewares.cAPreguntasSinResponder);
app.use(middlewares.cAPreguntasText);
app.use(middlewares.cAPreguntasEtiqueta);


// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});
