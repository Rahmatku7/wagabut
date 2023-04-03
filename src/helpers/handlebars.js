const {helper} = require("./system.js");

exports.base_url = helper('system', 'base_url');
exports.get_date = helper('text', 'get_date');

exports.section = function(name, options) {
    var helper = this;
     if (!this._sections) {
        this._sections = {};
        this._sections._get = function(arg){
           if(typeof helper._sections[arg] === 'undefined'){
              // throw new Error('The section "' + arg + '" is required.')
              return '';
           } else {
              return helper._sections[arg];
           }
        }
     }

     if(!this._sections[name]){
        this._sections[name] = options.fn(this);
     }

     return null;
}

exports.render_section = function(name) {
   return this._sections._get(name);
}

exports.isdefined = function(value) {
   return value !== undefined;
}