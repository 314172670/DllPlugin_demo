const path = require('path')
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['antd','react','react-dom','react-router'], //按首字母排放,常用的公共库打包
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/static/js'), //__dirname在这指的当前目录，生成一个vendor.js文件的存放位置
    library: '[name]', // 当前vendor的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用，各个模块的地址映射
      name: '[name]',
      context: __dirname
    }),
    
  ],
  
}
