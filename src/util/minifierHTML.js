const htmlMinifier = require('html-minifier');


module.exports = function minifierHTML( html ){

  const compressedHTML = htmlMinifier.minify( html, {
    // 处理多余的空格
    collapseWhitespace: true,
    // 保留一个空格
    conservativeCollapse: true,
    // 删除全部空格
    collapseInlineTagWhitespace: true,
    // 移除 script 标签的 type 属性
    removeScriptTypeAttributes: true,
    // 移除 style 标签的 type 属性
    removeStyleLinkTypeAttributes: true,
    // 移除注释
    removeComments: true,
    // 防止转义属性的值
    preventAttributesEscaping: true
  });

  return compressedHTML.trim();
}