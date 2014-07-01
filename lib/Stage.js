var Material = require('Material');

var Stage = function(el, settings){
  'use strict';


  Material.apply(this, el, settings);

};

Stage.prototype = new Material();

module.exports = Stage;