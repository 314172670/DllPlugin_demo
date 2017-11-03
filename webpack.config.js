const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: {
    'dll-user': [__dirname + '/src/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins:[
    new webpack.DllReferencePlugin({
      manifest: require('./manifest.json'), // 指定manifest.json
      name: 'vendor'
     // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    }),
  ]
  ,
  module: {
    rules: [{
        test: /\.jsx?$/, // test 去判断是否为.js或.jsx,是的话就是进行es6和jsx的编译
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
     
      {
        test: /\.css$/,
         loader: require.resolve('css-loader'),
      }
    ]
  }
};