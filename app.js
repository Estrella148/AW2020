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
const utils = require("./utils");
const multer = require("multer");
const DAOUsuarios = require("./models/DAOUsuarios");
const DAOPreguntas = require("./models/DAOPreguntas");
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
app.get("/paginaInicial", function (request, response, next) {

    if (request.session.currentUser) {
        response.redirect("/paginaPrincipal");
    } else {
        response.status(200);
        response.render("paginaInicial", { errorMsg: null });
    }
});

app.get("/crearCuenta", function (request, response, next) {
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
            next(err);
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
app.get("/paginaPrincipal", controlAcceso, function (request, response, next) {
    daoU.getUsuario(request.session.currentUser, function (err, usuario) {
        if (err) {
            next(err);
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
app.post("/crearCuenta", multerFactory.single("img"), function (request, response, next) {
    let imagen = img_aleatoria();
    let error = false;
    if (request.body.password1 === request.body.password2) {
        if (request.file) {//si se sube fichero
            if (request.file.mimetype === "image/png" || request.file.mimetype === "image/jpeg") {
                imagen = request.file.filename;
            } else {
                fs.unlink(request.file.path, function (err) {//para eliminar el archivo cuando hay un error en el registro
                    if (err) {
                        next(err500(err, request, response));
                    }
                });
                error = true;
                response.status(200);
                response.render("crearCuenta", { errorMsg: "La imagen no tiene el formato correcto, no es .jpg o .png" });
            }
        }
        if (!error) {
            daoU.leerCorreoUsuario(request.body.email, function (err, result) {
                if (err) {
                    next(err);
                }
                else {
                    if (result != undefined) {
                        response.status(200);
                        response.render("crearCuenta", { errorMsg: "El usuario ya existe" });
                    } else {
                        daoU.insertarUsuario(request.body.email, request.body.password1, request.body.name, imagen, function (err, request) {
                            if (err) {
                                next(err);
                            }
                            else {
                                response.redirect("/paginaInicial");
                            }
                        });
                    }
                }
            });
        }

    } else {
        response.status(200);
        response.render("crearCuenta", { errorMsg: "Las contraseñas no coinciden" });
    }
})

//Imagenes:
app.get("/imagenUsuario/:id?", controlAcceso, function (request, response, next) {
    if (request.params.id) {
        response.sendFile(path.join(__dirname, "profile_imgs", request.params.id));
    }
    daoU.getUserImageName(request.session.currentUser, function (err, image) {
        if (err) {
            next(err);
        }
        else {
            response.sendFile(path.join(__dirname, "profile_imgs", image));
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

app.get("/busquedaUsuario", controlAcceso, controlAccesoDatosUsuario, function (request, response, next) {
    daoU.MostrarTodosUsuario(function (err, usersList) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("busquedaUsuario", { usersList: usersList });
        }
    })
});

app.get("/preguntas", controlAcceso, controlAccesoDatosUsuario, cAPreguntas, function (request, response, next) {
    daoP.mostrarTodasPreguntas(function (err, qList, numPreguntas) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("preguntas", { qList: qList, numPreguntas: numPreguntas });
        }
    })
});

app.get("/formularPregunta", controlAcceso, controlAccesoDatosUsuario, function (request, response, next) {
    response.status(200);
    response.render("formularPregunta", { errorMsg: null });

});

app.post("/formularPregunta", controlAccesoDatosUsuario, function (request, response, next) {

    if (utils.createTask(request.body.preguntaNueva).tags.length > 5) {
        response.status(200);
        response.render("formularPregunta", { errorMsg: "Como máximo son 5 etiquetas" });
    } else {
        daoP.insertarPregunta(response.locals.usuario.id, request.body.titulo, request.body.cuerpo, utils.createTask(request.body.preguntaNueva), function (err) {

            if (err) {
                next(err);
            }
            else {
                response.redirect("/preguntas");
            }
        });
    }

})

app.post("/preguntasText", controlAcceso, controlAccesoDatosUsuario, cAPreguntasText, function (request, response, next) {
    daoP.mostrarPreguntasText(request.body.buscador, function (err, qList, numPreguntas) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("preguntasText", { qList: qList, numPreguntas: numPreguntas });
        }
    })
});

app.get("/preguntasEtiqueta", controlAcceso, controlAccesoDatosUsuario, cAPreguntasEtiqueta,function (request, response, next) {
    daoP.mostrarPreguntasSinResponder(function (err, qList, numPreguntas) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("preguntasEtiqueta", { qList: qList, numPreguntas: numPreguntas});
        }
    })

});

app.get("/preguntasSinResponder", controlAcceso, controlAccesoDatosUsuario, cAPreguntasSinResponder, function (request, response, next) {
    daoP.mostrarPreguntasSinResponder(function (err, qList, numPreguntas) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("preguntasSinResponder", { qList: qList, numPreguntas: numPreguntas });
        }
    })
});

app.get("/infoPregunta", controlAcceso, controlAccesoDatosUsuario, function (request, response, next) {
    response.status(200);
    response.render("infoPregunta");
});



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

function img_aleatoria() {
    let array = ["estandar1.jpg", "estandar2.png", "estandar3.jpg"];
    return array[Math.floor(Math.random() * 3)];
}

//Middleware que nos proporciona los datos del usuario en todas las páginas.
//Lo usamos antes de entrar a otra página.
function controlAccesoDatosUsuario(request, response, next) {
    daoU.getUsuario(request.session.currentUser, function (err, usuario) {
        if (err) {
            next(err);
        }
        else {
            response.locals.usuario = usuario;
            next();
        }
    })
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
    response.locals.msg = "Preguntas con la etiqueta []";
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
        mensaje: error.message, pila: error.pila
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
