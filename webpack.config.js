
const path = require("path");

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    index: './index.ts',
    test: './test.ts',
  },
  output: {
    filename: '[name].js',
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
};

