const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {app: ["babel-polyfill", "./src/main.js"]},
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  //路径别名
  resolve:{
    alias: {
      '@c': path.resolve('src/cache'),
      '@p':path.resolve('src/public')
    }
  },
  plugins: [ // 插件
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    })
  ],
  /*?modules&localIdentName=[name]_[local]-[hash:5]*/
  //1.modules开启模块化
  //2.localIdentName设置名称显示规范可更改
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader?localIdentName=[name]_[local]-[hash:5]'] },
      { 
        test: /\.less$/, 
        use: [
          {
            loader: 'style-loader'
          },{
            loader: 'css-loader'
          },{
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color':'#00B2B2', // 全局主色
                'link-color': '#1890ff', // 链接色
              },
              javascriptEnabled: true
            }
          }
        ] 
      },
      { test: /\.(png|gif|bmp|jpg)$/, use: 'url-loader?limit=5000' },
      { test: /\.(js|jsx)$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/,
        query:{
          presets: ['react', 'es2015','stage-2'],
          plugins: [
            ['import', {
                libraryName: 'antd',
                style: true
            }]
          ]
        }
      },
      {
        test:/\.(eot|woff|woff2|svg|ttf)$/,
        use:'url-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:8088',
        host: 'http://localhost:8088',
        changeOrigin: true,
        secure: false
      }
    }
  }
}