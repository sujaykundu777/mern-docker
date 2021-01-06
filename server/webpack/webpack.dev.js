const path = require('path');
const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // for webpack
module.exports = {
    entry: './src/index.js',
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    mode: 'development',
    // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    // devServer: {
    //     contentBase:  path.join(__dirname, 'dist'),
    //     compress: true,
    //     hot: true,
    //     port: 9000
    // },
    plugins: [
        new webpack.ProgressPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html', //name of html file to be created
        //     template: './src/index' // source from which html file would be created
        // })
    ],
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, 'src')],
           //     exclude: path.resolve(__dirname, "node_modules"), // files to be ignored
                loader: 'babel-loader'
              }
        ]
    }
}
