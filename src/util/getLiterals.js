const typescript = require('typescript');
const forEachChild = require('./forEachChild.js');
const getTemplateParts = require('./getTemplateParts.js');


module.exports = function getLiterals( code, id ){
  const sourceFile = typescript.createSourceFile( id, code, typescript.ScriptTarget.ESNext, true );
  const literals = [];

  forEachChild( sourceFile, ( node ) => {
    // 判断是否是带标签的模板字符串
    if( typescript.isTaggedTemplateExpression( node ) ){
      const template = node.template;

      literals.push({
        tag: node.tag.getText( sourceFile ),
        parts: getTemplateParts( template, sourceFile )
      });
    }
  });

  return literals;
}