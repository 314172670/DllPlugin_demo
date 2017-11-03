## DllPlugin 和 DllReferencePlugin 
目的：打包的时候提取出公共包，如react、react-dom、antd等常用包

方法：

1、根目录下创建 `webpack.config.dll.js`

	const path = require('path')
	const webpack = require('webpack');
	
	module.exports = {
	  entry: {
	    vendor: ['antd','react','react-dom','react-router'], //按首字母排放,常用的公共库打包
	  },
	  output: {
	    filename: '[name].js',
		//__dirname在这指的当前目录，生成一个vendor.js文件的存放位置
	    path: path.resolve(__dirname, 'build/static/js'), 
		// 当前vendor的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
	    library: '[name]', 
	  },
	  plugins: [
	    new webpack.DllPlugin({
	      path: path.resolve(__dirname, 'manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用，各个模块的地址映射
	      name: '[name]',
	      context: __dirname
	    }),
	    
	  ],
	  
	}

2、根目录下创建 `webpack.config.js`
	
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
 		//使用
	    new webpack.DllReferencePlugin({
	      manifest: require('./manifest.json'), // 指定生成的manifest.json的位置
          // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
	      name: 'vendor'
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

> 此webpack配置较为简单，可根据需求自行配置，最终将打包成一个dll-user.bundle.js的文件


3、首先要编译webpack.config.dll.js文件，编译完成将生成两个文件，一个是vendor.js,一个是manifest.json供DllReferencePlugin使用。为了方便在package.js中配置编译命令

![](https://i.imgur.com/XuAqBHN.png)


	webpack --progress --colors --config ./webpack.config.dll.js  //编译
    
    webpack --progress --colors --config ./webpack.config.dll.js  //打包命令

编译生成文件

![](https://i.imgur.com/K32G7Ju.png)

> 注意每次改webpack.config.dll.js这个包中的内容，都要重新编译生成新的文件，再执行打包

4、使用DllPlugin和不适用DllPlugin打包对比

![](https://i.imgur.com/oA14xal.png)

> 会惊奇发现，打包速度变快，打包的文件包变小，大功告成！！

