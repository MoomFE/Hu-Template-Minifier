const minifier = require('../src/index.js');
const expect = require('chai').expect;


describe( 'minifier.core.options', function(){

  it( '选项 conservativeCollapse 默认为 true, 在遇到多个空格时, 压缩成一个而不是全部删除', () => {
    // 不传值默认情况
    {
      const origin = `
        html\`
          <div>
            <span>123</span>
          </div>
        \`
      `;
      const result = `
        html\`<div> <span>123</span> </div>\`
      `;

      expect(
        minifier( origin )
      ).is.equals( result );
    }
    // 传值为 true
    {
      const origin = `
        html\`
          <div>
            <span>123</span>
          </div>
        \`
      `;
      const result = `
        html\`<div> <span>123</span> </div>\`
      `;

      expect(
        minifier( origin, '', {
          conservativeCollapse: true
        })
      ).is.equals( result );
    }
  });

  it( '选项 conservativeCollapse 为 false 时, 在遇到多个空格时, 将删除全部空格', () => {
    const origin = `
      html\`
        <div>
          <span>123</span>
        </div>
      \`
    `;
    const result = `
      html\`<div><span>123</span></div>\`
    `;

    expect(
      minifier( origin, '', {
        conservativeCollapse: false
      })
    ).is.equals( result );
  });

  it( '选项 removeComments 默认为 false, 将默认保留文档注释', () => {
    // 不传值默认情况
    {
      const origin = `
        html\`
          <div>
            <!-- 123123123 -->
            <span>123</span>
          </div>
        \`
      `;
      const result = `
        html\`<div> <!-- 123123123 --> <span>123</span> </div>\`
      `;

      expect(
        minifier( origin, '' )
      ).is.equals( result );
    }
    // // 传值为 false
    {
      const origin = `
        html\`
          <div>
            <!-- 123123123 -->
            <span>123</span>
          </div>
        \`
      `;
      const result = `
        html\`<div> <!-- 123123123 --> <span>123</span> </div>\`
      `;

      expect(
        minifier( origin, '', {
          removeComments: false
        })
      ).is.equals( result );
    }
  });

  it( '选项 removeComments 为 true 时, 将移除文档注释', () => {
    const origin = `
      html\`
        <div>
          <!-- 123123123 -->
          <span>123</span>
        </div>
      \`
    `;
    const result = `
      html\`<div> <span>123</span> </div>\`
    `;

    expect(
      minifier( origin, '', {
        removeComments: true
      })
    ).is.equals( result );
  });

  it( '选项 removeComments 为 true 时, 单个文档注释', () => {
    const origin = `
      html\`
        <!---->
      \`
    `;
    const result = `
      html\`\`
    `;

    expect(
      minifier( origin, '', {
        removeComments: true
      })
    ).is.equals( result );
  });

  it( '选项 removeComments 为 true 时, 单个文档注释与文档注释前面的插值', () => {
    const origin = `
      html\`
        \${ null }
        <!---->
      \`
    `;
    const result = `
      html\`\${ null }\`
    `;

    expect(
      minifier( origin, '', {
        removeComments: true
      })
    ).is.equals( result );
  });

  it( '选项 removeComments 为 true 时, 单个文档注释与文档注释后面的插值', () => {
    const origin = `
      html\`
        <!---->
        \${ null }
      \`
    `;
    const result = `
      html\`\${ null }\`
    `;

    expect(
      minifier( origin, '', {
        removeComments: true
      })
    ).is.equals( result );
  });

  it( '选项 removeComments 为 true 时, 单个文档注释及文档注释内部的插值及文档注释前面的插值', () => {
    // 1
    {
      const origin = `
        html\`
          \${ 1 }
          <!--\${ 2 }-->
        \`
      `;
      const result = `
        html\`\${ 1 }\`
      `;

      expect(
        minifier( origin, '', {
          removeComments: true
        })
      ).is.equals( result );
    }
    // 2
    {
      const origin = `
        html\`
          \${ 1 }
          <!-- \${ 2 } -->
        \`
      `;
      const result = `
        html\`\${ 1 }\`
      `;

      expect(
        minifier( origin, '', {
          removeComments: true
        })
      ).is.equals( result );
    }
  });

  it( '选项 removeComments 为 true 时, 单个文档注释及文档注释内部的插值及文档注释后面的插值', () => {
    // 1
    {
      const origin = `
        html\`
          <!--\${ 1 }-->
          \${ 2 }
        \`
      `;
      const result = `
        html\`\${ 2 }\`
      `;

      expect(
        minifier( origin, '', {
          removeComments: true
        })
      ).is.equals( result );
    }
    // 2
    {
      const origin = `
        html\`
          <!-- \${ 1 } -->
          \${ 2 }
        \`
      `;
      const result = `
        html\`\${ 2 }\`
      `;

      expect(
        minifier( origin, '', {
          removeComments: true
        })
      ).is.equals( result );
    }
  });

  it( '选项 removeComments 为 true 时, 多个文档注释', () => {
    const origin = `
      html\`
        <!---->
        <!----><!---->
        <!---->
      \`
    `;
    const result = `
      html\`\`
    `;

    expect(
      minifier( origin, '', {
        removeComments: true
      })
    ).is.equals( result );
  });

  it( '选项 removeComments 为 true 时, 多个文档注释与文档注释前面的插值', () => {
    const origin = `
      html\`
        \${ null }
        <!---->
        <!----><!---->
        <!---->
      \`
    `;
    const result = `
      html\`\${ null }\`
    `;

    expect(
      minifier( origin, '', {
        removeComments: true
      })
    ).is.equals( result );
  });

  it( '选项 removeComments 为 true 时, 多个文档注释与文档注释后面的插值', () => {
    const origin = `
      html\`
        <!---->
        <!----><!---->
        <!---->
        \${ null }
      \`
    `;
    const result = `
      html\`\${ null }\`
    `;

    expect(
      minifier( origin, '', {
        removeComments: true
      })
    ).is.equals( result );
  });

  it( '选项 removeComments 为 true 时, 多个文档注释及文档注释内部的插值及文档注释前面的插值', () => {
    // 1
    {
      const origin = `
        html\`
          \${ 1 }
          <!--\${ 2 }-->
          <!--\${ 3 }--><!----><!--\${ 4 }zw\${ 4 }-->
          <!--\${ 5 }-->
        \`
      `;
      const result = `
        html\`\${ 1 }\`
      `;

      expect(
        minifier( origin, '', {
          removeComments: true
        })
      ).is.equals( result );
    }
    // 2
    {
      const origin = `
        html\`
          \${ 1 }
          <!-- \${ 2 } -->
          <!-- \${ 3 } --><!----><!-- \${ 4 }zw\${ 4 } -->
          <!-- \${ 5 } -->
        \`
      `;
      const result = `
        html\`\${ 1 }\`
      `;

      expect(
        minifier( origin, '', {
          removeComments: true
        })
      ).is.equals( result );
    }
  });

  it( '选项 removeComments 为 true 时, 多个文档注释及文档注释内部的插值及文档注释前面的插值', () => {
    // 1
    {
      const origin = `
        html\`
          <!--\${ 1 }-->
          <!--\${ 2 }--><!----><!--\${ 3 }zw\${ 3 }-->
          <!--\${ 4 }-->
          \${ 5 }
        \`
      `;
      const result = `
        html\`\${ 5 }\`
      `;

      expect(
        minifier( origin, '', {
          removeComments: true
        })
      ).is.equals( result );
    }
    // 2
    {
      const origin = `
        html\`
          <!-- \${ 1 } -->
          <!-- \${ 2 } --><!----><!-- \${ 3 }zw\${ 3 } -->
          <!-- \${ 4 } -->
          \${ 5 }
        \`
      `;
      const result = `
        html\`\${ 5 }\`
      `;

      expect(
        minifier( origin, '', {
          removeComments: true
        })
      ).is.equals( result );
    }
  });

  it( '选项 removeComments 为 true 时, 多个文档注释及文档注释内部的插值及普通插值', () => {
    const origin = `
      html\`
        \${ 1 }
        <!--\${ 2 }-->
        <!--\${ 3 }-->\${ 4 }<!----><!--\${ 5 }zw\${ 5 }-->
        <!--\${ 6 }-->
        \${ 7 }
      \`
    `;
    const result = `
      html\`\${ 1 } \${ 4 } \${ 7 }\`
    `;

    expect(
      minifier( origin, '', {
        removeComments: true
      })
    ).is.equals( result );
  });

});