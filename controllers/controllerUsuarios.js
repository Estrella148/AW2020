// "use strict";
// const DAOUsuarios = require("../models/DAOUsuarios");
// const config = require("./config");
// const path = require("path");
// const mysql = require("mysql");
// const express = require("express");
// const bodyParser = require("body-parser");
// const session = require("express-session");
// const mysqlSession = require("express-mysql-session");
// const fs = require("fs");
// const utils = require("./utils");
// const multer = require("multer");
// const multerFactory = multer({ dest: path.join(__dirname, "profile_imgs") });
// const MySQLStore = new mysqlSession(session);
// const sessionStore = new MySQLStore(config.mysqlConfig);
// const middlewareSession = session({
//     saveUninitialized: false,
//     secret: "estheryalex",
//     resave: false,
//     store: sessionStore
// });

// // Crear un servidor Express.js
// const app = express();
// //Crear middleware para la sesión
// app.use(middlewareSession);
// // Crear un pool de conexiones a la base de datos de MySQL
// const pool = mysql.createPool(config.mysqlConfig);
// // Crear instancia 
// const daoU = new DAOUsuarios(pool);
