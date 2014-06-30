var Material = function(el, settings){
  'use strict';

  var log = require('./utils/log');

  if(typeof jQuery !== 'undefined' && el instanceof jQuery){
    // passed in jQuery object, strip out DOM elem
    el = el[0];
  }
  if(typeof el === 'undefined' || !el){
    el = document.createElement('div');
  }

  this.el = el;
  this.children = [];

  this.immutableSettings = {
    'position': 'absolute',
    'z-index': 0,
    'top': 0,
    'left': 0
  };

  this.settings = {
    content: '',
    x: 0,
    y: 0,
    z: 0,
    width: 0,
    height: 0,
    scale: {
      x: 0,
      y: 0,
      z: 0
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    skew: {
      x: 0,
      y: 0
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

Material.prototype.addChild = function(el) {
  var _ = require('lodash');
  // make sure user is trying to add a Material
  if(!this.isMaterial(el)){
    console.error('Only Materials can be added to a Material through addChild()');
    return;
  }

  // throw circular reference error if new child contains this material
  if(el.contains(this)){
    console.error('Circular Reference when adding material.');
    return;
  }

  // if already exists, place at top of stack
  var removedMats = _.remove(this.children, function(mat){
    return mat === el;
  });
  if(removedMats.length > 0){
    this.children = this.children.concat(removedMats);
  }else{
    this.children[this.children.length] = el;
  }
  this.updateCSS();
};

// removes and destroys passed in material
Material.prototype.removeChild = function(el) {
  var self = this,
    log = require('./utils/log'),
    _ = require('lodash');
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
  this.updateCSS();
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
  var _ = require('lodash');
  return _.indexOf(this.children, mat) >= 0;
};

module.exports = Material;