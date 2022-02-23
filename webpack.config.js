const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: '/xuni/',
    filename: "bundle.js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'www'),
    },
    compress: true,
    port: 3702,
  }
}
