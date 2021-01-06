const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');




/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');




module.exports = {
  mode: 'development',
  target:'node',
  watch: false,
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename:'main.[contenthash].css' })
    	// Other rules..
  ],
  resolve: {
    fallback : {
      util: require.resolve("util/"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer/"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      os: require.resolve("os-browserify/browser"),
      vm: require.resolve("vm-browserify"),
      stream: require.resolve("stream-browserify"),
      constants: require.resolve("constants-browserify"),
      assert: require.resolve("assert/"),
      zlib: require.resolve("browserify-zlib")
    }
  },
  /* For all the pollyfill fallbacks
  * resolve: {
  *   alias: {
  *     assert: "assert",
  *     buffer: "buffer",
  *     console: "console-browserify",
  *     constants: "constants-browserify",
  *     crypto: "crypto-browserify",
  *     domain: "domain-browser",
  *     events: "events",
  *     http: "stream-http",
  *     https: "https-browserify",
  *     os: "os-browserify/browser",
  *     path: "path-browserify",
  *     punycode: "punycode",
  *     querystring: "querystring-es3",
  *     stream: "stream-browserify",
  *     _stream_duplex: "readable-stream/duplex",
  *     _stream_passthrough: "readable-stream/passthrough",
  *     _stream_readable: "readable-stream/readable",
  *     _stream_transform: "readable-stream/transform",
  *     _stream_writable: "readable-stream/writable",
  *     string_decoder: "string_decoder",
  *     sys: "util",
  *     timers: "timers-browserify",
  *     tty: "tty-browserify",
  *     url: "url",
  *     util: "util",
  *     vm: "vm-browserify",
  *     zlib: "browserify-zlib"
  * }},
  */
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    }, {
      test: /.css$/,

      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: "style-loader"
      }, {
        loader: "css-loader",

        options: {
          sourceMap: true
        }
      }]
    }]
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  }
}