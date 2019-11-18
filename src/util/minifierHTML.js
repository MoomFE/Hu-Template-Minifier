require('@moomfe/zenjs');
const htmlMinifier = require('html-minifier');


const defaultOptions = {
  // 保留一个空格
  conservativeCollapse: true,
  // 移除注释
  removeComments: true
};
const defaultOptionsKeys = Object.keys( defaultOptions );


module.exports = function minifierHTML( html, userOptions ){
  const options = Object.$assign( null, defaultOptions, {}.$get.apply(
    userOptions,
    defaultOptionsKeys
  ));

  const compressedHTML = htmlMinifier.minify( html, {
    // 处理多余的空格
    collapseWhitespace: true,
    // 删除全部空格
    collapseInlineTagWhitespace: true,
    // 移除 script 标签的 type 属性
    removeScriptTypeAttributes: true,
    // 移除 style 标签的 type 属性
    removeStyleLinkTypeAttributes: true,
    // 防止转义属性的值
    preventAttributesEscaping: true,
    // 开放出的配置
    ...options
  });

  return compressedHTML.trim();
}