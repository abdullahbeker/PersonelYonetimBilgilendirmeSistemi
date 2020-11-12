const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const currentTask = process.env.npm_lifecycle_event

const config = {
  entry: path.join(__dirname, 'app', 'App.js'),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app', 'template.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [require('autoprefixer')]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /.js?$/,
        include: [path.resolve(__dirname, 'app')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map'
}

if (currentTask === 'dev') {
  config.mode = 'development'
  config.devServer = {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 3000
  }
  config.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].js'
  }
}

if (currentTask == 'build') {
  config.mode = 'production'
  config.output = {
    publicPath: '',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  }
}

module.exports = config
