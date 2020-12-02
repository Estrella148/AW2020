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

    /*Imagen de perfil de usuario: Obtienes el fichero de la imagen del usuario identificado por su email*/
    getUserImageName(correo, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT img FROM user WHERE email = ?",[correo],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (err) {
                    callback(new Error("Error de acceso a la base de datos"));
                }
                else {
                    if (rows.length === 0) {
                        callback(new Error("Usuario no existe")); //no existe el usuario identificado por el email
                    }
                    else {
                        callback(null, rows[0].img);//devuelve el fichero de imagen
                    }           
                }
            });
            }
        }
        );

    }
}



module.exports = DAOUsers;
