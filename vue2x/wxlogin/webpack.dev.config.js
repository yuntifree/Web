var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
      index:['./src/js/zepto.min.js','./src/js/template.js','./src/js/wechatutil.js',
              './src/js/md5.js','./src/js/cgi.js','./src/js/swipelide.js','./src/js/index.js']
    },
    output: {
      path: __dirname + "/logintest"+new Date().getTime(),
      filename: 'js/[name]-[hash].js',
      publicPath: 'http://wx.yunxingzh.com/'
    },
    plugins: [
      new htmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',  //文件生成的名字
        inject: true, //文件生成放在哪，true自动 false页面里写明 head头部 bodybody里
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        chunks: ['index'],
      })
    ]
}