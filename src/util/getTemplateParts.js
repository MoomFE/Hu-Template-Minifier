const typescript = require('typescript');


function getHeadTemplatePart( node, sourceFile ){
  const fullText = node.getFullText( sourceFile );
  const startOffset = fullText.indexOf('`') + 1;
  const endOffset = typescript.isTemplateHead( node ) ? -2 : -1;

  return {
    text: fullText.slice( startOffset, fullText.length + endOffset ),
    start: node.pos + startOffset,
    end: node.end + endOffset
  };
}

function getMiddleTailTemplatePart( node, sourceFile ){
  const fullText = node.getFullText( sourceFile );
  const startOffset = fullText.indexOf('}') + 1;
  const endOffset = typescript.isTemplateMiddle( node ) ? 2 : 1;

  return {
    text: fullText.slice( startOffset, fullText.length - endOffset ),
    start: node.pos + startOffset,
    end: node.end - endOffset
  };
}


module.exports = function getTemplateParts( node, sourceFile ){
  // 没有使用插值绑定
  // 例如: html`<span>something</span>`
  if( typescript.isNoSubstitutionTemplateLiteral( node ) ){
    return [
      getHeadTemplatePart( node, sourceFile )
    ];
  }
  // 使用了插值绑定
  // 例如: html`<span>${ something }</span>`
  else{
    return [
      getHeadTemplatePart( node.head, sourceFile ),
      ...node.templateSpans.map( templateSpan => {
        return getMiddleTailTemplatePart( templateSpan.literal, sourceFile );
      })
    ];
  }
}