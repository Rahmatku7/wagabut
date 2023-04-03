
exports.controller = function(string) {
    const split = string.split("::");
    const req = require(`../controllers/${split[0]}.js`);
    return req[split[1]];
}

exports.config = function(file, _var) {
    const req = require(`../configs/${file}.js`);
    return req[_var];
}


exports.validation = function(string) {
    const split = string.split("::");
    const req = require(`../validations/${split[0]}.js`);
    return req[split[1]];
}

exports.helper = function(file, _var=false) {
    if(_var) {
        const req = require(`./${file}.js`);
        return req[_var];
    } else {
        return require(`./${file}.js`);
    }
}

exports.model = function(string) {
    const req = require(`../models/${string}.js`);
    return req;
}

exports.middleware = function(string) {
    const split = string.split("::");
    const req = require(`../middlewares/${split[0]}.js`);
    return req[split[1]];
}

exports.base_url = function(url="") {
    const config = require("../configs/app.js");
    const base_url = config.base_url.replace(/^\/+|\/+$/g, '');
    const url_to = url.replace(/^\/+|\/+$/g, '');
    return `${base_url}/${url_to}`;
}