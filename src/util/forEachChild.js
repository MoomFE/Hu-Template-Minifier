const typescript = require('typescript');


module.exports = function forEachChild( node, callback ){
  callback( node );
  typescript.forEachChild( node, child => {
    forEachChild( child, callback );
  });
}