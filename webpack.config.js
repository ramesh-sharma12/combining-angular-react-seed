const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

// Webpack Config
var webpackConfig = {
  entry: {
    'angular-main': './src/main.browser.ts',
    'react-main': './src/app/App.jsx'
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist')
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)src(\\|\/)linker/, path.resolve(__dirname, './src'), {
      // your Angular Async Route paths relative to this root directory
    }),

    new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html', inject: 'body'}),

    extractSass
  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
      }, {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      }, {
        test: /\.html$/,
        loader: 'raw-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              includePaths: ["./src/app/sass"]
            }
          }
        ]
      }
    ]
  }

};

// Our Webpack Defaults
var defaultConfig = {
  devtool: 'source-map',

  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: [
      '.ts', '.js', 'jsx'
    ],
    modules: [path.resolve(__dirname, 'node_modules')]
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
};

module.exports = webpackMerge(defaultConfig, webpackConfig);
