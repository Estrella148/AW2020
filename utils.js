"use strict";

function createTask(texto) {
    let obj = new Object();
    if(typeof(texto) == "string") {//Ir al medico @personal @salud
        let tag = texto.match((/\@[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ]+/g)); //Cogemos tags con @
        tag=String(tag).match(/[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ]+/g);//Cogemos las tags sin el @, convirtiendo tag en un string
        let tex = texto.replace((/\@[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ]*/g ),"");//Reemplazamos las tag por un vacio
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
    createTask:createTask
};