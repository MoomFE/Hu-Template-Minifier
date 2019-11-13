require('@moomfe/zenjs');
const minifier = require('../src/index.js');
const defaultOptions = require('./defaultOptions.js');
const { extname } = require('path');
const { createFilter } = require('rollup-pluginutils');


module.exports = function( userOptions ){
  const options = Object.$assign( {}, defaultOptions, userOptions );
  const extensions = options.extensions || [];

  if( extensions.length === 0 ){
    return;
  }

  var filter = createFilter( options.include, options.exclude );

  return {
    transform( code, id ){
      if( !extensions.includes( extname( id ) ) ){
        return;
      }
      if( !filter( id ) ){
        return;
      }

      return minifier( code, id );
    }
  };
}