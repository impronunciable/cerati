
var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      { loader: 'babel-loader', test: /\.js$/, include: path.resolve(__dirname, 'src') },
      { loader: 'json-loader', test: /\.json$/, exclude: /node_modules/ }
    ]
  },
  resolve: {
    root: [ path.resolve('./src') ]
  },
  plugins: []
}
