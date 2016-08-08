'use-strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
// must match config.webpack.dev_server.port
var devServerPort = 3808;
var production = process.env.TARGET === 'production';

var config = {
  devtool: 'eval-source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: production ? '[name]-[chunkhash].js' : '[name].js',
    chunkFilename: "[id].chunk.js",
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      { test: /\.less$/, loader: "style!css!less" }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },

  plugins: [
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
  })]
};

if (production) {
   config.plugins.push(
     new webpack.NoErrorsPlugin(),
     new webpack.optimize.UglifyJsPlugin({
       compressor: { warnings: false },
       sourceMap: false
     }),
     new webpack.DefinePlugin({
       'process.env': { NODE_ENV: JSON.stringify('production') }
     }),
     new webpack.optimize.DedupePlugin(),
     new webpack.optimize.OccurenceOrderPlugin()
   );
} else {
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  config.output.publicPath = '//localhost:' + devServerPort + '/public/';
  // Source maps
  config.devtool = 'cheap-module-eval-source-map';
}

module.exports = config;
