const path = require('path');
const webpack = require('webpack');
const globalVars = require('./src/css/var.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  pages: {
    index: {
      entry: 'src/app.js',
      template: 'index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  css: {
    loaderOptions: {
      less: {
        globalVars
      }
    }
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 50000000,
      maxAssetSize: 30000000,
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    },
    resolve: {
      alias: {
        model: path.resolve(__dirname, 'src/js/model/'),
        js: path.resolve(__dirname, 'src/js/'),
        components: path.resolve(__dirname, 'src/components/')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Utils: [path.resolve(__dirname, 'src/js/common/utils'), 'default'],
        Manba: 'manba',
        HeyUI: 'heyui',
        Model: 'js-model',
        G: 'hey-global',
        log: 'hey-log',
        R: [path.resolve(__dirname, 'src/js/common/ajax'), 'default']
      }),
      new CopyWebpackPlugin(
        [
          {
            patterns: [
              {
                from: 'D:/heyui-admin-shuhua/static/tinymce/',
                to: 'D:/heyui-admin-shuhua/dist/static/tinymce/'
              }
            ],
            options: {}
          }
        ])
    ]
  },
  devServer: {
    // proxy: {
    // 此处应该配置为开发服务器的后台地址
    // 配置文档： https://cli.vuejs.org/zh/config/#devserver-proxy
    // '/api': {
    //   target: 'http://xxx.xx.xx'
    // }
    // }
  }
};
