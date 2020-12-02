"use strict";

class DAOUsuarios {

    constructor(pool) { 
        this.pool = pool;
    }

    /*Usuario correcto: comprueba si en la bbdd el email y la contraseña del usuario son correctar y coinciden con las dadas*/
    isUserCorrect(correo, pass, callback) {

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM user WHERE correo = ? AND pass = ?" ,
            [correo,pass],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (err) {
                    callback(new Error("Error de acceso a la base de datos"));
                }
                else {
                    if (rows.length === 0) {
                        callback(null, false); //no está el usuario con el password proporcionado
                    }
                    else {
                        callback(null, true); //si está el usuario con el password proporcionado
                    }           
                }
            });
            }
        }
        );
    }

    /*Insertar nuevo usuario*/
    insertarUsuario(correo, pass, nombre, imagen, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("INSERT INTO usuarios (correo, pass, nombre, imagen, reputacion, contPreguntas, contRespuestas, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())",
            [correo, pass, nombre, imagen, 0, 0, 0],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (err) {
                    callback(new Error("Error de acceso a la base de datos"));
                }
                else {
                    callback(null);
                }
            });
            }
        }
        );

    }
}



module.exports = DAOUsuarios;
