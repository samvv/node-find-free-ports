
const path = require("path");

module.exports = [{
  target: 'node',
  mode: 'production',
  entry: {
    isFree: './src/isFree.ts',
    index: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", options: { transpileOnly: true } },
      { test: /\.m?js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  }
}, {
  target: 'node',
  mode: 'production',
  entry: './src/test.ts',
  output: {
    filename: 'test.js',
    path: path.resolve(__dirname),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", options: { transpileOnly: true } },
      { test: /\.m?js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  }
}];

