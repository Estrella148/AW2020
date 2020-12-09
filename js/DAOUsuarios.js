"use strict";

class DAOUsuarios {

    constructor(pool) { 
        this.pool = pool;
    }

    /*Usuario correcto: comprueba si en la bbdd el email y la contraseña del usuario son correctar y coinciden con las dadas*/
    usuarioCorrecto(correo, pass, callback) {

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM usuarios WHERE correo = ? AND pass = ?" ,
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

    //get Usuario.
    getUsuario(id, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM usuarios WHERE id = ?",[id],
            function(err, rows) {
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

    //Obtenemos el usuario que ha formulado una pregunta en concreto.
    getUsuarioPreguntas(idPreguntas, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT (nombre, imagen) FROM usuarios JOIN preguntas WHERE id = ?",[idPreguntas],
            function(err, rows) {
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

    getUsuarioRespuestas(idRespuestas, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT (nombre, imagen) FROM usuarios JOIN respuestas WHERE id = ?",[idRespuestas],
            function(err, rows) {
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

       //obtener imagen.
    getImagen(id, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT imagen FROM usuarios WHERE id = ?",[id],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (rows.length == 0) {//la consulta no ha devuelto resultados
                    callback(new Error("Usuario sin imagen"));
                    //Query insertar imagen por defecto.
                } else {
                    callback(null, rows[0]);
                }
            });
            }
        }
        );
    }

    getMedallaOro(idUsuario, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM usuarios JOIN medallaoro WHERE id = ?",[idUsuario],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (rows.length == 0) {//la consulta no ha devuelto resultados
                    callback(new Error("No hay medallas de oro"));
                } else {
                    callback(null, rows[0]);
                }
            });
            }
        }
        );
    }

    getMedallaPlata(idUsuario, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM usuarios JOIN medallaplata WHERE id = ?",[idUsuario],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (rows.length == 0) {//la consulta no ha devuelto resultados
                    callback(new Error("No hay medallas de plata"));
                } else {
                    callback(null, rows[0]);
                }
            });
            }
        }
        );
    }

    getMedallaBronce(idUsuario, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM usuarios JOIN medallabronce WHERE id = ?",[idUsuario],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (rows.length == 0) {//la consulta no ha devuelto resultados
                    callback(new Error("No hay medallas de bronce"));
                } else {
                    callback(null, rows[0]);
                }
            });
            }
        }
        );
    }
    //Mostrar todos los usuarios
    /*MostrarTodosUsuario(id, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM usuarios",[],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (result.length == 0) {//la consulta no ha devuelto resultados
                    callback(new Error("No existe el usuario"));
                } else {
                    callback(null, result[0]);
                }
            });
            }
        }
        );
    }*/

}



module.exports = DAOUsuarios;
