require('@moomfe/zenjs');
const MagicString = require('magic-string');
const getLiterals = require('./util/getLiterals.js');
const getPlaceholder = require('./util/getPlaceholder.js');
const minifierHTML = require('./util/minifierHTML.js');
const processCode = require('./util/processCode.js');


module.exports = function minifier( userCode = '', id = '', userOptions ){
  const options = Object.$assign( null, userOptions );
  const code = processCode( userCode, id, options );
  const literals = getLiterals( code, id );

  if( literals.length ){
    const msCode = new MagicString( code );

    literals.forEach( literal => {
      const placeholder = getPlaceholder( literal.parts );
      const combined = literal.parts.map( part => part.text ).join( placeholder );
      const min = minifierHTML( combined, options );
      const minParts = min.split( placeholder );

      literal.parts.forEach(({ start, end }, index) => {
        msCode.overwrite( start, end, minParts[ index ] );
      });
    });

    return msCode.toString();
  }

  return code;
}