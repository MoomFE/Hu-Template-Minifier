const minifier = require('../core/index.js');


module.exports = function( option = {} ){
  return {
    name: 'hu-template-minifier',
    transform( code, id ){
      return minifier( code, id );
    }
  };
}