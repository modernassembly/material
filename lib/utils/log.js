module.exports = function(val){

  require('console-shim');

  var global = require('../global');

  if(global.DEBUG){
    console.log('%c Material ::: ' + val, 'color:#E26FC5');
  }

};