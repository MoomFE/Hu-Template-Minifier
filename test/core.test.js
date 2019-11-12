const minifier = require('../src/core/index');
const expect = require('chai').expect;


describe( 'minifier.core', function(){

  it( '可以正确的对使用了标签的模板字符串进行 HTML 压缩', () => {
    const origin = "html` <div></div> `";
    const result = "html`<div></div>`"

    expect(
      minifier( origin )
    ).is.equals( result );
  });

});