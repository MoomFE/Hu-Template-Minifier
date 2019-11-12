

module.exports = function getPlaceholder( parts ){
  const suffix = '();';
  let placeholder = '@TEMPLATE_EXPRESSION';

  function cb( part ){
    return part.text.includes( placeholder + suffix );
  }

  while( parts.some( cb ) ){
    placeholder += '_';
  }

  return placeholder + suffix;
}