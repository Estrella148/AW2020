"use strict";
const mysql = require("mysql");
const config = require("./config");

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

function obtenerPool(){
    return pool;
}

function terminarPool(){
    pool.end();
}

function createTask(texto) {
    let obj = new Object();
    if(typeof(texto) == "string") {//Ir al medico @personal @salud
        let tag = texto.match((/\@[a-zA-ZáéíóúÁÉÍÓÚñÑ]+/g)); //Cogemos tags con @
        tag=String(tag).match(/\w+/g);//Cogemos las tags sin el @, convirtiendo tag en un string
        let tex = texto.replace((/\@[a-zA-Z]*/g ),"");//Reemplazamos las tag por un vacio
        tex=tex.trim();//quitamos espacios delante y detrás
        tex=tex.replace("  "," ");//quitamos espaciados dobles
        obj = {
            text: tex,
            tags: tag
        };
    }
    else throw new Error("Dato no permitido");

    return obj;
}

module.exports= {
    createTask:createTask,
    obtenerPool:obtenerPool,
    terminarPool:terminarPool
};