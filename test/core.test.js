const minifier = require('../src/core/index');
const expect = require('chai').expect;


describe( 'minifier.core', function(){

  it( '对模板进行压缩', () => {
    const origin = "html` <div>123</div> `";
    const result = "html`<div>123</div>`"

    expect(
      minifier( origin )
    ).is.equals( result );
  });

  it( '对多层级的模板进行压缩', () => {
    const origin = `
      html\`
        <div>
          <span>123</span>
        </div>
      \`
    `;
    const result = `
      html\`<div><span>123</span></div>\`
    `

    expect(
      minifier( origin )
    ).is.equals( result );
  });

  it( '对使用了插值绑定的模板进行压缩', () => {
    const origin = `
      html\`
        <div>${ 123 }</div>
      \`
    `;
    const result = `
      html\`<div>${ 123 }</div>\`
    `;

    expect(
      minifier( origin )
    ).is.equals( result );
  });

  it( '不会影响到普通的模板字符串', () => {
    const origin = `
      \`
        <div>123</div>
      \`
    `;

    expect(
      minifier( origin )
    ).is.equals( origin );
  });

});