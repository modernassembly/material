var test = require('tape');
var $ = require('jquery');
var Material = require('../lib/Material.js');


test('Init Material', function(t){
  var testDiv = document.createElement('div');

  var matWithDiv = new Material(testDiv);
  var matNoParams = new Material();

  t.strictEqual(matWithDiv.el.nodeName, 'DIV');
  t.strictEqual(matNoParams.el.nodeName, 'DIV');

  t.end();
});

test('Add / Remove Material', function(t){
  var mat1 = new Material(),
    mat2 = new Material(),
    mat3 = new Material();

  // init with 0 children
  t.strictEqual(mat1.numChildren(), 0, 'init with 0 children');

  // add child
  mat1.addChild(mat2);
  t.strictEqual(mat1.numChildren(), 1, 'test numChildren() after adding');

  // add child
  mat1.addChild(mat3);
  t.strictEqual(mat1.numChildren(), 2, 'test numChildren() after adding');

  // add circular reference
  t.throws(mat3.addChild(mat1), null, 'test circular reference error thrown');
  t.strictEqual(mat3.numChildren(), 0, 'test circular reference didn\'t add child');

  // test adding material from below puts it on top
  mat1.addChild(mat2);
  t.strictEqual(mat1.numChildren(), 2, 'test adding material from below doesn\'t add new element');
  t.strictEqual(mat1.children[1], mat2, 'test adding material puts it on top');
  t.strictEqual(mat1.children[0], mat3, 'test puts it on bottom');


  mat1.removeChild(mat2);
  t.strictEqual(mat1.numChildren(), 1, 'test removeChild');
  t.strictEqual(mat1.children[0], mat3, 'test children after remove child');

  t.end();

});