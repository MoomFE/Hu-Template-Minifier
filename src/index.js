require('@moomfe/zenjs');
const MagicString = require('magic-string');
const getLiterals = require('./util/getLiterals.js');
const getPlaceholder = require('./util/getPlaceholder.js');
const minifierHTML = require('./util/minifierHTML.js');


module.exports = function minifier( code = '', id = '', userOptions ){
  const literals = getLiterals( code, id );

  if( literals ){
    const msCode = new MagicString( code );
    const options = Object.$assign( null, userOptions );

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