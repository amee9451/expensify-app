const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';

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
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        test: /\.s?css$/
      }]
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }
  };
};