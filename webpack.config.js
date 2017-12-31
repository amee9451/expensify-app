const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [{
        use: [{
          loader: 'babel-loader'
        }],
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new ExtractTextPlugin('styles.css'),
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new CopyWebpackPlugin([{ from:'./src/images', to:'images' }])
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true
    }
  };
};