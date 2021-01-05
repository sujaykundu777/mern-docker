const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase:  path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 9000
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html', //name of html file to be created
    //         template: './src/index' // source from which html file would be created
    //     })
    // ],
    module: {
        rules: [
            {
                test: /\.js$/, //using regex to tell babel exactly what files to transcompile
                exclude: path.resolve(__dirname, "node_modules"), // files to be ignored
                use: {
                    loader: 'babel-loader' // specify the loader
                } 
            }
        ]
    }
}
