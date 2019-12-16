const MagicString = require('magic-string');
const getLiterals = require('./getLiterals.js');


module.exports = function processCode( userCode, id, options ){
  if( options.removeComments === true ){
    const literals = getLiterals( userCode, id );

    if( literals.length ){
      const msCode = new MagicString( userCode );

      literals.forEach( literal => {
        const parts = literal.parts;
        let isCommentBinding;
        let commentBindingOpen;

        for( let index = 0; index < parts.length; index ++ ){
          const { start, text } = parts[ index ];
          const commentOpen = text.lastIndexOf('<!--');

          if( isCommentBinding ){
            const commentClose = text.indexOf( '-->' );

            if( commentClose > -1 && commentBindingOpen != null ){
              msCode.overwrite( commentBindingOpen, start + commentClose + 3, '' );
              commentBindingOpen = null
            }
          }
          if( isCommentBinding = ( commentOpen > -1 || isCommentBinding ) ){
            if( commentOpen > -1 ){
              commentBindingOpen = start + commentOpen;
            }
          }
        }
      });

      return msCode.toString();
    }
  }

  return userCode;
}