const path = require('path')
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'js/bundle.js'
    },
   devServer: {
    static: {
        directory: path.join(__dirname, "./")
      }
   },
   plugins: [
     new HTMLPlugin({
       filename: 'index.html',
       template: './src/index.html'
     })
   ],
   resolve: {
     extensions: ['.js']
   },
   
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  
}