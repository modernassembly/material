// https://github.com/ryanmorr/is-style-supported
// http://ryanmorr.com/demos/is-style-supported/


// below: http://perfectionkills.com/feature-testing-css-properties/

module.exports = {

  prefixes: ['Moz', 'Webkit', 'Khtml', 'O', 'Ms'],

  _cache: { },

  getStyleProperty: function(propName, element){
    element = element || document.documentElement;
    var style = element.style,
        prefixed,
        uPropName;

    // check cache only when no element is given
    if (arguments.length == 1 && typeof _cache[propName] == 'string') {
      return _cache[propName];
    }
    // test standard property first
    if (typeof style[propName] == 'string') {
      return (_cache[propName] = propName);
    }

    // capitalize
    uPropName = propName.charAt(0).toUpperCase() + propName.slice(1);

    // test vendor specific properties
    for (var i=0, l=prefixes.length; i<l; i++) {
      prefixed = prefixes[i] + uPropName;
      if (typeof style[prefixed] == 'string') {
        return (_cache[propName] = prefixed);
      }
    }
  }

};