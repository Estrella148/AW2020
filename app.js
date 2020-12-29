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
const multer=require("multer");
const DAOUsuarios = require("./models/DAOUsuarios");
const DAOPreguntas = require("./models/DAOPreguntas");
const multerFactory=multer();
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
const daoP = new DAOPreguntas(pool);

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

//Login
app.get("/paginaInicial", function (request, response) {

    if (request.session.currentUser) {
        response.redirect("/paginaPrincipal");
    } else {
        response.status(200);
        response.render("paginaInicial", { errorMsg: null });
    }
});

app.get("/crearCuenta", function (request, response) {
    if (request.session.currentUser) {
        response.redirect("/paginaPrincipal");
    } else {
        response.status(200);

        response.render("crearCuenta", { errorMsg: null });
    }
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
                response.redirect("/paginaPrincipal");
            }
            else {
                response.render("paginaInicial", { errorMsg: "Dirección de correo y/o contraseña no válidos" });
            }
        }
    });
});

//pagina principal
app.get("/paginaPrincipal", controlAcceso, function (request, response) {
    daoU.getUsuario(request.session.currentUser, function (err, usuario) {
        if (err) {
            //next(err500(err, request, response));
        }
        else {
            response.status(200);
            response.render("paginaPrincipal", { usuario: usuario });
        }
    })
});

app.get("/perfilUsuario", controlAcceso, controlAccesoDatosUsuario, function (request, response) {
    response.status(200);
    response.render("perfilUsuario");
});

//Insertar usuario
app.post("/crearCuenta", function (request, response) {
    if (request.body.password1 === request.body.password2) {
        daoU.insertarUsuario(request.body.email, request.body.password1, request.body.name, request.body.img, function (err, request) {
            if (err) {
                //next(err500(err, request, response));
            }
            else {
                response.redirect("/paginaInicial");
            }
        });
    } else {
        response.status(200);
        response.render("crearCuenta", { errorMsg: "Las contraseñas no coinciden" });
    }

})

//Imagenes:
app.get("/imagenUsuario", controlAcceso, function (request, response, next) {
    daoU.getUserImageName(request.session.currentUser, function (err, image) {
        if (err) {
            next(err);
        }
        else {
            if (image == null) {
                response.sendFile(path.join(__dirname, "public/img/NoPerfil.jpg"));
            }
            else {
                response.sendFile(path.join(__dirname, "profile_imgs", image));
            }
        }
    });
});

//Perfil usuario.
/* app.get("/perfilUsuario", controlAcceso, controlAccesoDatosUsuario, function (request, response) {
    daoU.getMedallaBronce(request.session.currentUser, function(errBronce, bronces){
        daoU.getMedallaPlata(request.session.currentUser, function(errPlata, platas){
            daoU.getMedallaOro(request.session.currentUser, function(errOro, oros){
                if (errBronce || errPlata || errOro) {
                    //next(err500(err, request, response));
                }
                else {
                    response.status(200);
                    response.render("perfilUsuario", { bronces: bronces, platas: platas, oros: oros });
                }
            })
        })
    })
}); */

app.get("/busquedaUsuario", controlAcceso, controlAccesoDatosUsuario, function (request, response) {
    daoU.MostrarTodosUsuario(function (err, usersList) {
        if (err) {
            //next(err500(err, request, response));
        }
        else {
            response.status(200);
            response.render("busquedaUsuario", { usersList: usersList });
        }
    })
});

app.get("/preguntas", controlAcceso, controlAccesoDatosUsuario, function (request, response) {
    daoP.mostrarTodasPreguntas(function (err, qList) {
        if (err) {
            //next(err500(err, request, response));
        }
        else {
            response.status(200);
            response.render("preguntas", { qList: qList });
        }
    })
});

app.get("/preguntasSinResponder", controlAcceso, controlAccesoDatosUsuario, function (request, response) {
});

//Desconectar
app.get("/cerrarSesion", controlAcceso, function (request, response) {
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

//Middleware que nos proporciona los datos del usuario en todas las páginas.
//Lo usamos antes de entrar a otra página.
function controlAccesoDatosUsuario(request, response, next) {
    daoU.getUsuario(request.session.currentUser, function (err, usuario) {
        if (err) {
            //next(err500(err, request, response));
        }
        else {
            response.locals.usuario = usuario;
            next();
        }
    })
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
