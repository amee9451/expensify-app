const path = require('path');

module.exports = {
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
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: [
                        "transform-class-properties"
                    ]
                }
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
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};