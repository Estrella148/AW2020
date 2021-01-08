"use strict";

function err404(request, response) {
    response.status(404);
    response.render("error404", { url: request.url });
}

function err500(error, request, response, next) {
    response.status(500);
    response.render("error500", {
        mensaje: error.message
    });
}

module.exports ={
    err404:err404,
    err500:err500
}