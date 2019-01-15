const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const prodEntryPoint = path.resolve(__dirname, './src/client/Index.jsx');
const devEntryPoint = ['react-dev-utils/webpackHotDevClient', prodEntryPoint];

const prodLoader = [MiniCssExtractPlugin.loader, 'css-loader'];
const styleLoader =
  process.env.NODE_ENV !== 'production' ? ['css-hot-loader', ...prodLoader] : prodLoader;

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = (env, argv) => ({
  devtool: argv.mode === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  entry: argv.mode === 'production' ? prodEntryPoint : devEntryPoint,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: true,
    hot: argv.mode !== 'production',
    noInfo: true,
    historyApiFallback: true,
    port: 8000,
    proxy: {
      '/api': 'http://localhost:9000'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: styleLoader
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[ext]'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    argv.mode !== 'production' ? new webpack.HotModuleReplacementPlugin() : () => { },
    htmlPlugin,
    new MiniCssExtractPlugin({
      filename: argv.mode === 'production' ? 'style.[hash].css' : '[name].css',
      chunkFilename: 'style.[id].css'
    })
  ]
});
