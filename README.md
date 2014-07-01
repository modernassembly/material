material
========

A lightweight, front-end alternative for traditional DOM manipulation, in exchange for smooth &amp; complex UIs.


## Development

Make sure to install watchify globally:

`npm install -g watchify`

And run this command to watch:

`watchify lib/Material.js -r ./lib/Material.js:Material -o dist/material.js`

## Build

Make sure to install uglify globally:

`npm install -g uglifyjs`

And run this command to build:

`browserify lib/Material.js -r ./lib/Material.js:Material | uglifyjs > dist/material.min.js`