const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.join(__dirname, 'public'),
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
        use: CSSExtract.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }]
    },
    plugins: [
      CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }
  };
};