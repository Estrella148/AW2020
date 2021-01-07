"use strict";

class DAOUsuarios {

    constructor(pool) {
        this.pool = pool;
    }

    /*Usuario correcto: comprueba si en la bbdd el email y la contraseña del usuario son correctar y coinciden con las dadas*/
    usuarioCorrecto(correo, pass, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuarios WHERE correo = ? AND pass = ?",
                    [correo, pass],
                    function (err, rows) {
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

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("INSERT INTO usuarios (correo, pass, nombre, imagen, reputacion, contPreguntas, contRespuestas, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())",
                    [correo, pass, nombre, imagen, 1, 0, 0],
                    function (err, rows) {
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

    /*Insertar nuevo usuario*/
    leerCorreoUsuario(correo, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT correo FROM usuarios WHERE correo = ?", [correo],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null, rows[0]);
                        }
                    });
            }
        }
        );
    }

    //get Usuario.
    //Cambiado el parámetro id por el correo.
    getUsuario(correo, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuarios WHERE correo = ?", [correo],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (rows.length == 0) {//la consulta no ha devuelto resultados
                            callback(new Error("No existe el usuario"));
                        } else {
                            callback(null, rows[0]);
                        }
                    });
            }
        }
        );
    }


    /*Imagen de perfil de usuario: Obtienes el fichero de la imagen del usuario identificado por su email*/
    getUserImageName(email, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT imagen FROM usuarios WHERE correo = ?", [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (rows.length === 0) {
                                callback(new Error("Usuario no existe")); //no existe el usuario identificado por el email
                            }
                            else {
                                callback(null, rows[0].imagen);//devuelve el fichero de imagen
                            }
                        }
                    });
            }
        }
        );

    }

    getPerfilUsuario(idU, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuarios WHERE id = ?", [idU],
                    function (err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos para ver usuario"));
                        }
                        else {
                            callback(null, rows[0]);
                        }
                    });
            }
        }
        );
    }

    getMedallaOro(idUsuario, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT nombre, cantidad FROM medallaoro WHERE idUsuario = ?", [idUsuario],
                    function (err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos para ver oros"));
                        }
                        else {
                            if (rows === undefined) {
                                callback(null,[],0);
                            }
                            else {
                                let cantidad = 0;
                                rows.forEach(e =>{
                                    cantidad+=e.cantidad;
                                });
                                console.log(cantidad);
                                callback(null, rows, cantidad);
                            }
                        }
                    });
            }
        }
        );
    }

    getMedallaPlata(idUsuario, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT nombre,cantidad FROM medallaplata WHERE idUsuario = ?", [idUsuario],
                    function (err, rows) {
                        
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos para ver plata"));
                        }
                        else {
                            if (rows === undefined) {
                                callback(null,[],0);
                            }
                            else {
                                let cantidad = 0;
                                rows.forEach(e =>{
                                    cantidad+=e.cantidad;
                                });
                                console.log(cantidad)
                                callback(null, rows,cantidad);
                            }
                        }
                    });
            }
        }
        );
    }

    getMedallaBronce(idUsuario, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT nombre,cantidad FROM medallabronce WHERE idUsuario = ?", [idUsuario],
                    function (err, rows) {
                        
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos para ver bronces"));
                        }
                        else {
                            if (rows === undefined) {
                                callback(null,[],0);
                            }
                            else {
                                let cantidad = 0;
                                rows.forEach(e =>{
                                    cantidad+=e.cantidad;
                                });
                                console.log(cantidad);
                                callback(null, rows, cantidad);
                            }
                        }
                    });
            }
        }
        );
    }

    // Mostrar todos los usuarios. Guardamos en un array objetos en los que
    // cada uno de ellos contiene el id, nombre y reputacion de un usuario.
    MostrarTodosUsuario(callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT id, nombre, reputacion, imagen FROM usuarios",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (rows.length == 0) {//la consulta no ha devuelto resultados
                            callback(new Error("No existe ningún usuario"));
                        } else {
                            let array = new Array();    //Array de usuarios
                            let object = new Object();
                            rows.forEach(element => {
                                if (array[element.id] === undefined) {
                                    object = {
                                        id: element.id,
                                        nombre: element.nombre,
                                        reputacion: element.reputacion,
                                        imagen: element.imagen
                                    };
                                    array[object.id] = object;
                                }
                            });
                            callback(null, array);//devuelve el array
                        }
                    });
            }
        });
    }
}

module.exports = DAOUsuarios;
