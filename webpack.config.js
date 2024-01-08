const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
  devtool: 'nosources-source-map',
  externals: [{ 'aws-sdk': 'commonjs aws-sdk' }],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/,
          // '.serverless',
          // '.webpack',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
  },
};
