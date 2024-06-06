const path = require('path');

module.exports = {
  port: 8080,
  root: 'dist',
  stat: false,
  webpack: {
    console: true,
    publicPath: '/',
    output: {
      './index.html': {
        entry: './src/app'
      }
    },
    alias: {
      model: './src/js/model/',
      js: './src/js/',
      components: './src/components/'
    },
    global: {
      Utils: [path.resolve(__dirname, 'src/js/common/utils'), 'default'],
      Ajax: [path.resolve(__dirname, 'src/js/common/ajax'), 'default'],
      Manba: 'manba',
      HeyUI: 'heyui',
      Model: 'js-model',
      G: 'hey-global'
    },
    devServer: {
      proxy: {
        // 此处应该配置为开发服务器的后台地址
        '/api': {
          // target: 'http://222.128.31.237:8899',
          // target: 'http://shuhua.nnyun.net',
          target: 'http://192.168.110.41',
          changeOrigin: true
        }
      },
      historyApiFallback: true
    },
    globalVars: './src/css/var.less',
    externals: {}
  },
  copy: ['static/images/*', 'static/tinymce/*', 'call/*', './baidu_verify_7O2vpVMzwg.html']
};
