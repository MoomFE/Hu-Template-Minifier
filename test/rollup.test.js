const minifier = require('../rollup/index.js');
const expect = require('chai').expect;
const { resolve } = require('path');


describe( 'minifier.rollup.plugin', function(){
  const origin = "html`  <div>123</div>  `";
  const result = "html`<div>123</div>`";
  const cwd = process.cwd();

  it( '使用 extensions 选项用于定义需要进行压缩的文件后缀, 选项默认值为 [ ".js" ]', () => {
    const plugin = minifier();

    expect(
      plugin.transform( origin, 'index.js' )
    ).is.equals( result );

    expect(
      plugin.transform( origin, 'index.css' )
    ).is.undefined;
  });

  it( '使用 extensions 选项可配置多个文件后缀的数组', () => {
    const plugin = minifier({
      extensions: [ '.js', '.css' ]
    });

    expect(
      plugin.transform( origin, 'index.js' )
    ).is.equals( result );

    expect(
      plugin.transform( origin, 'index.css' )
    ).is.equals( result );
  });

  it( '使用 extensions 选项为空数组时, 插件则不会加载', () => {
    const plugin = minifier({
      extensions: []
    });

    expect( plugin ).is.undefined;
  });


  it( '使用 include 选项包含需要的文件, 默认全部包含', () => {
    const plugin = minifier();

    expect(
      plugin.transform( origin, resolve( cwd, 'index1.js' ) )
    ).is.equals( result );

    expect(
      plugin.transform( origin, resolve( cwd, 'index2.js' ) )
    ).is.equals( result );

    expect(
      plugin.transform( origin, resolve( cwd, 'other.js' ) )
    ).is.equals( result );
  });

  it( '使用 include 选项包含需要的文件, 选项可为字符串格式', () => {
    const plugin = minifier({
      include: 'index2.js'
    });

    expect(
      plugin.transform( origin, resolve( cwd, 'index1.js' ) )
    ).is.undefined;

    expect(
      plugin.transform( origin, resolve( cwd, 'index2.js' ) )
    ).is.equals( result );

    expect(
      plugin.transform( origin, resolve( cwd, 'other.js' ) )
    ).is.undefined;
  });

  it( '使用 include 选项包含需要的文件, 选项可为数组格式', () => {
    const plugin = minifier({
      include: [
        'index1.js',
        'index2.js'
      ]
    });

    expect(
      plugin.transform( origin, resolve( cwd, 'index1.js' ) )
    ).is.equals( result );

    expect(
      plugin.transform( origin, resolve( cwd, 'index2.js' ) )
    ).is.equals( result );

    expect(
      plugin.transform( origin, resolve( cwd, 'other.js' ) )
    ).is.undefined;
  });

  it( '使用 include 选项包含需要的文件, 可以使用 minimatch 格式进行匹配', () => {
    // string: 1
    {
      const plugin = minifier({
        include: '*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.equals( result );
    }
    // string: 2
    {
      const plugin = minifier({
        include: 'index*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.undefined;
    }
    // array: 1
    {
      const plugin = minifier({
        include: [
          '*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.equals( result );
    }
    // array: 2
    {
      const plugin = minifier({
        include: [
          'index*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.undefined;
    }
  });

  it( '使用 include 选项包含需要的文件, 可以使用 minimatch 格式进行匹配, 单层目录', () => {
    // string: 1
    {
      const plugin = minifier({
        include: 'components/*/*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.equals( result );
    }
    // string: 2
    {
      const plugin = minifier({
        include: 'components/*/index*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.undefined;
    }
    // array: 1
    {
      const plugin = minifier({
        include: [
          'components/*/*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.equals( result );
    }
    // array: 2
    {
      const plugin = minifier({
        include: [
          'components/*/index*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.undefined;
    }
  });
  
  it( '使用 include 选项包含需要的文件, 可以使用 minimatch 格式进行匹配, 多层目录', () => {
    // string: 1
    {
      const plugin = minifier({
        include: 'components/**/*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.equals( result );
    }
    // string: 2
    {
      const plugin = minifier({
        include: 'components/**/index*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.undefined;
    }
    // array: 1
    {
      const plugin = minifier({
        include: [
          'components/**/*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.equals( result );
    }
    // array: 2
    {
      const plugin = minifier({
        include: [
          'components/**/index*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.undefined;
    }
  });

  it( '使用 include 选项包含需要的文件, 可以使用正则进行匹配', () => {
    // string: 1
    {
      const plugin = minifier({
        include: /.+\.js/
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.equals( result );
    }
    // string: 2
    {
      const plugin = minifier({
        include: /index.\.js/
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.undefined;
    }
    // array: 1
    {
      const plugin = minifier({
        include: [
          /.+\.js/
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.equals( result );
    }
    // array: 2
    {
      const plugin = minifier({
        include: [
          /index.\.js/
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.undefined;
    }
  });


  it( '使用 exclude 选项排除不需要进行压缩的文件, 默认不排除', () => {
    const plugin = minifier();

    expect(
      plugin.transform( origin, resolve( cwd, 'index1.js' ) )
    ).is.equals( result );

    expect(
      plugin.transform( origin, resolve( cwd, 'index2.js' ) )
    ).is.equals( result );

    expect(
      plugin.transform( origin, resolve( cwd, 'other.js' ) )
    ).is.equals( result );
  });

  it( '使用 exclude 选项排除不需要进行压缩的文件, 选项可为字符串格式', () => {
    const plugin = minifier({
      exclude: 'index2.js'
    });

    expect(
      plugin.transform( origin, resolve( cwd, 'index1.js' ) )
    ).is.equals( result );

    expect(
      plugin.transform( origin, resolve( cwd, 'index2.js' ) )
    ).is.undefined;

    expect(
      plugin.transform( origin, resolve( cwd, 'other.js' ) )
    ).is.equals( result );
  });

  it( '使用 exclude 选项排除不需要进行压缩的文件, 选项可为数组格式', () => {
    const plugin = minifier({
      exclude: [
        'index1.js',
        'index2.js'
      ]
    });

    expect(
      plugin.transform( origin, resolve( cwd, 'index1.js' ) )
    ).is.undefined;

    expect(
      plugin.transform( origin, resolve( cwd, 'index2.js' ) )
    ).is.undefined;

    expect(
      plugin.transform( origin, resolve( cwd, 'other.js' ) )
    ).is.equals( result );
  });

  it( '使用 exclude 选项排除不需要进行压缩的文件, 可以使用 minimatch 格式进行匹配', () => {
    // string: 1
    {
      const plugin = minifier({
        exclude: '*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.undefined;
    }
    // string: 2
    {
      const plugin = minifier({
        exclude: 'index*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.equals( result );
    }
    // array: 1
    {
      const plugin = minifier({
        exclude: [
          '*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.undefined;
    }
    // array: 2
    {
      const plugin = minifier({
        exclude: [
          'index*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.equals( result );
    }
  });

  it( '使用 exclude 选项排除不需要进行压缩的文件, 可以使用 minimatch 格式进行匹配, 单层目录', () => {
    // string: 1
    {
      const plugin = minifier({
        exclude: 'components/*/*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.undefined;
    }
    // string: 2
    {
      const plugin = minifier({
        exclude: 'components/*/index*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.equals( result );
    }
    // array: 1
    {
      const plugin = minifier({
        exclude: [
          'components/*/*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.undefined;
    }
    // array: 2
    {
      const plugin = minifier({
        exclude: [
          'components/*/index*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.equals( result );

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.equals( result );
    }
  });
  
  it( '使用 exclude 选项排除不需要进行压缩的文件, 可以使用 minimatch 格式进行匹配, 多层目录', () => {
    // string: 1
    {
      const plugin = minifier({
        exclude: 'components/**/*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.undefined;
    }
    // string: 2
    {
      const plugin = minifier({
        exclude: 'components/**/index*.js'
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.equals( result );
    }
    // array: 1
    {
      const plugin = minifier({
        exclude: [
          'components/**/*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.undefined;
    }
    // array: 2
    {
      const plugin = minifier({
        exclude: [
          'components/**/index*.js'
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/yyy/index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'components/xxx/other.js' ) )
      ).is.equals( result );
    }
  });

  it( '使用 exclude 选项排除不需要进行压缩的文件, 可以使用正则进行匹配', () => {
    // string: 1
    {
      const plugin = minifier({
        exclude: /.+\.js/
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.undefined;
    }
    // string: 2
    {
      const plugin = minifier({
        exclude: /index.\.js/
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.equals( result );
    }
    // array: 1
    {
      const plugin = minifier({
        exclude: [
          /.+\.js/
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.undefined;
    }
    // array: 2
    {
      const plugin = minifier({
        exclude: [
          /index.\.js/
        ]
      });

      expect(
        plugin.transform( origin, resolve( cwd, 'index1.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'index2.js' ) )
      ).is.undefined;

      expect(
        plugin.transform( origin, resolve( cwd, 'other.js' ) )
      ).is.equals( result );
    }
  });

  it( '使用 exclude 选项是从已包含文件中进行排除', () => {
    const plugin = minifier({
      include: 'index*.js',
      exclude: 'index2.js'
    });

    expect(
      plugin.transform( origin, resolve( cwd, 'index1.js' ) )
    ).is.equals( result );

    expect(
      plugin.transform( origin, resolve( cwd, 'index2.js' ) )
    ).is.undefined;

    expect(
      plugin.transform( origin, resolve( cwd, 'other.js' ) )
    ).is.undefined;
  });


  it( '会将插件选项传入核心方法内', () => {
    const origin = "html` <!-- 123 --> <div>123</div>  `";
    const result = "html`<!-- 123 --> <div>123</div>`";
    const result2 = "html`<div>123</div>`";

    // 不传值情况
    {
      const plugin = minifier();

      expect(
        plugin.transform( origin, 'index.js' )
      ).is.equals( result );
    }
    // 传值情况对比
    {
      const plugin = minifier({
        removeComments: true
      });

      expect(
        plugin.transform( origin, 'index.js' )
      ).is.equals( result2 );
    }
  });

});