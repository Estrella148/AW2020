"use strict";

class DAORespuestas {
    constructor(pool) {
        this.pool = pool;
    }

    getRespuesta(id, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM respuestas WHERE idRespuesta = ?",[id],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (rows.length == 0) {//la consulta no ha devuelto resultados
                    callback(new Error("No existe la respuesta"));
                } else {
                    callback(null, rows[0]);
                }
            });
            }
        }
        );
    }


}

module.exports = DAORespuestas;
