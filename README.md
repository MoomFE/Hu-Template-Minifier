# Hu-Template-Minifier
该类库将使用了 [模板字符串 - 标签 ( Template Strings )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) 功能实现模板定义的类库中的 HTML 代码进行压缩.


## Installation
```bash
npm install @moomfe/hu-template-minifier
```

```js
// 使用 minifier 方法
const minifier = require('@moomfe/hu-template-minifier');
```

```js
// 使用 minifier 的 rollup 插件
const minifier = require('@moomfe/hu-template-minifier/rollup');
```


## Supports:
- [Hu](https://github.com/MoomFE/Hu)
- [lit-html](https://github.com/Polymer/lit-html)


## Transplant From
  - [parse-literals](https://github.com/asyncLiz/parse-literals) - [LICENSE](https://github.com/asyncLiz/parse-literals/blob/master/LICENSE.md)
  - [minify-html-literals](https://github.com/asyncLiz/minify-html-literals) - [LICENSE](https://github.com/asyncLiz/minify-html-literals/blob/master/README.md)