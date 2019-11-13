# Hu-Template-Minifier
该类库将使用了 [模板字符串 - 标签 ( Template Strings )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) 功能实现模板定义的类库中的 HTML 代码进行压缩.


## Installation
```bash
npm install @moomfe/hu-template-minifier
```


## Usage
```js
// 使用 minifier 方法
const minifier = require('@moomfe/hu-template-minifier');

minifier( code );
```


```js
// 使用 minifier 的 rollup 插件
const minifier = require('@moomfe/hu-template-minifier/rollup');

rollup({
  plugins: [
    minifier(/* options */)
  ]
});
```


### Plugin Options
``` js
{
  // 需要进行压缩的文件后缀
  extensions: [ '.js' ], // 默认值
      // 可包含多个
      extensions: [ '.js', '.ts' ],

  // 需要包含的文件
  include: undefined, // 默认值 ( 包含全部 )
      // 普通匹配
      include: 'index.js',
      // 使用 minimatch 格式进行匹配
      include: 'components/*/index.js',
      include: 'components/**/index.js',
      // 使用正则进行匹配
      include: /api\.js/,
      // 使用支持的格式组成数组进行匹配
      include: [
        'components/*/index.js',
        /api\.js/
      ],

  // 需要从已包含的文件中排除的文件
  // 使用的格式与 include 选项一致, 不再进行举例
  exclude: undefined // 默认值
}
```


## Supports
- [Hu](https://github.com/MoomFE/Hu)
- [lit-html](https://github.com/Polymer/lit-html)


## Transplant From
  - [parse-literals](https://github.com/asyncLiz/parse-literals) - [LICENSE](https://github.com/asyncLiz/parse-literals/blob/master/LICENSE.md)
  - [minify-html-literals](https://github.com/asyncLiz/minify-html-literals) - [LICENSE](https://github.com/asyncLiz/minify-html-literals/blob/master/README.md)