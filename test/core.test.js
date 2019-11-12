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
        <div>\${ 123 }</div>
      \`
    `;
    const result = `
      html\`<div>\${ 123 }</div>\`
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

  it( '不会影响到插值绑定内的内容', () => {
    const origin = `
      html\`
        <div attr="\${ \` <div>123</div> \` }">
          \${ \` <div>123</div> \` }
        </div>
      \`
    `;
    const result = `
      html\`<div attr="\${ \` <div>123</div> \` }">\${ \` <div>123</div> \` }</div>\`
    `;

    expect(
      minifier( origin )
    ).is.equals( result );
  });

  it( '不会为没有引号的 attr 擅自添加引号', () => {
    const origin = `
      html\`
        <div class=\${ 'zw' }></div>
      \`
    `;
    const result = `
      html\`<div class=\${ 'zw' }></div>\`
    `;

    expect(
      minifier( origin )
    ).is.equals( result );
  });

  it( '不会擅自修改 attr 的引号', () => {
    const origin = `
      html\`
        <div class='\${ 'zw' }'></div>
      \`
    `;
    const result = `
      html\`<div class='\${ 'zw' }'></div>\`
    `;

    expect(
      minifier( origin )
    ).is.equals( result );
  });

});