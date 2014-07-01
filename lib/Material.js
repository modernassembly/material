var _ = require('lodash');

var Material = function(el, settings){
  'use strict';

  var log = require('./utils/log');

  if(typeof jQuery !== 'undefined' && el instanceof jQuery){
    // passed in jQuery object, strip out DOM elem
    el = el[0];
  }
  if(typeof el === 'undefined' || !el){
    el = document.createElement('div');
    // TODO: add to DOM
    // http://www.paulirish.com/2011/surefire-dom-element-insertion/
  }

  this.el = el;
  this.children = [];

  this.css = {
    content: '',
    x: null,
    y: null,
    z: null,
    scale: {
      x: null,
      y: null,
      z: null
    },
    rotate: {
      x: null,
      y: null,
      z: null
    },
    skew: {
      x: null,
      y: null
    }
  };
  if(_.isObject(settings)){
    this.settings = _.extend(this.settings, settings);
  }
};

Material.prototype.set = function(key, value) {
  if(_.has(this.settings, key)){
    // to do
  }else{
    // doesn't have key
  }
};


Material.prototype.addChild = function(newMaterial) {
  var self = this;
  // make sure user is trying to add a Material
  if(!this.isMaterial(newMaterial)){
    console.error('Only Materials can be added to a Material through addChild()');
    return;
  }
  // throw circular reference error if new child contains this material
  if(newMaterial.contains(this)){
    console.error('Circular Reference when adding material.');
    return;
  }
  // fetch the material if it already exists
  var removedMats = _.remove(this.children, function(mat){
    return mat === newMaterial;
  });
  if(removedMats.length > 0){
    // place already existing materials at the top of the display stack
    this.children = this.children.concat(removedMats);
    _.each(removedMats, function(mat){
      if(newMaterial.el.contains(mat.el)) self.el.removeChild(mat.el);
      self.el.appendChild(mat.el);
    });
  }else{
    console.dir(self.el);
    console.dir(newMaterial.el);
    self.el.appendChild(newMaterial.el);
    this.children[this.children.length] = newMaterial;
  }
};

// removes and destroys passed in material
Material.prototype.removeChild = function(el) {
  var self = this,
    log = require('./utils/log');
  // make sure user is trying to remove a Material
  if(!this.isMaterial(el)){
    console.error('Only Materials can be removed from a Material through removeChild()');
    return;
  }
  // fetch child
  var removedMats = _.remove(this.children, function(mat){
    return mat === el;
  });
  // if child doesn't exist here
  if(removedMats.length === 0){
    throw 'Warning: You are trying to remove a Material that doesn\'t exist on this Material';
  }else{
    _.each(removedMats, function(mat){
      // remove from DOM
      if(el.contains(mat)) self.el.removeChild(mat);
      // destroy Material
      mat.destroy();
    });
  }
};


Material.prototype.destroy = function() {
  var log = require('./utils/log');
  log('Destroying Material.');
};

Material.prototype.updateCSS = function() {
  // z-indexing, translate, scale, skew, width, height
};


/*

Utilities

 */
Material.prototype.numChildren = function() {
  return this.children.length;
};

Material.prototype.isMaterial = function(el) {
  return (el instanceof Material);
};

Material.prototype.contains = function(mat) {
  return _.indexOf(this.children, mat) >= 0;
};

module.exports = Material;