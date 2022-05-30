const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const apiMocker = require('mocker-api')
const { port, host, headers, version, enableBundleAnalyzer } = require("./config")

const env = process.env.NODE_ENV || 'dev'
const isDev = env === 'dev'
const lessModuleRegex = /\.module\.less$/

module.exports = () => {
  const options = {
    target: "web",
    mode: isDev ? 'development' : 'production',
    entry: './src/index',
    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'dist'),
      chunkFilename: `${version}/[name].[contenthash].js`,
      publicPath: isDev ? '/' : './',
    },
    devServer: {
      compress: true,
      clientLogLevel: 'warning',
      hot: true,
      inline: true,
      port,
      host,
      headers,
      before: app => {
        apiMocker(app, path.resolve('./mock/index'), {
          changeHost: true,
        })
      },
      proxy: {
        '/api': {
          target: 'http://10.240.50.105',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api',
          },
        },
      }
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {
      rules: [
        {
          test: /\.(j|t)s[x]?$/,
          use: [{
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          }],
          include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'mock'),
          ],
        },
        {
          test: /\.(le|c)ss$/,
          exclude: [/\.module\.css$/, lessModuleRegex],
          use: isDev
            ? [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1
                }
              },

              {
                loader: "postcss-loader",
                options: { sourceMap: true }
              },
              {
                loader: "less-loader",
                options: {
                  sourceMap: true,
                  lessOptions:{
                    javascriptEnabled: true
                  }
                }
              }]
            : [MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
            {
              loader: "less-loader",
              options: {
                sourceMap: false,
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
            ],
        },
        {
          test: lessModuleRegex,
          include: [path.resolve(__dirname, 'src')],
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 2,
                modules: {
                  localIdentName: '[name]-[local]-[hash:base64:5]'
                },
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|cur|ico|eot|ttf|svg|woff|woff2)$/,
          exclude: [path.resolve(__dirname, './src/assets/icons')],
          use: [
            {
              loader: "file-loader",
              options: {
                name: `${version}/[name].[hash:8].[ext]`,
                limit: 50000
              }
            }
          ]
        },
        {
          test: /^((?!\.color).)*((?!\.color).)\.svg$/,
          include: [path.resolve(__dirname, './src/assets/icons')],
          use: [
            { loader: 'svg-sprite-loader' },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeTitle: true },
                  { convertColors: { shorthex: true } },
                  { convertPathData: true },
                  { removeComments: true },
                  { removeDesc: true },
                  { removeUselessDefs: true },
                  { removeEmptyAttrs: true },
                  { removeHiddenElems: true },
                  { removeEmptyText: true },
                  { removeUselessStrokeAndFill: true },
                  { moveElemsAttrsToGroup: true },
                  { removeStyleElement: true },
                  { cleanupEnableBackground: true },
                  { removeAttrs: { attrs: '(stroke|fill|filter)' } },
                ],
              },
            },
          ],
        },
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".less", ".css", ".ts", ".tsx"],
      enforceExtension: false,
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@public': path.resolve(__dirname, './public'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@services': path.resolve(__dirname, './src/services'),
        '@stores': path.resolve(__dirname, './src/stores')
      },
    },
    optimization: {
      usedExports: true,
      concatenateModules: true,
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          // react: {
          //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          //   name: 'react',
          //   chunks: 'all',
          //   priority: 10 
          // },
          // antd: {
          //   test: /[\\/]node_modules[\\/]antd[\\/]/,
          //   name: 'antd',
          //   chunks: 'all',
          //   priority: 10 
          // },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors"
          },
          commons: {
            name: "commons",
            minChunks: 2,
            chunks: "initial"
          },
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            minChunks: 2,
            enforce: true
          }
        }
      },
      minimizer: isDev
        ? []
        : [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
              compress: {
                drop_debugger: false,
                drop_console: false  //调试打时开
              }
            }
          }),
          new OptimizeCssAssetsPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
          })
        ],
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new LodashModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }),
      new webpack.ProvidePlugin({
        React: 'react',
        moment: 'moment',
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        options: {
          runtimeChunk: {
            name: "runtime"
          }
        }
      }),
      new HtmlWebpackPlugin({
        title: "duuliy-web",
        filename: "index.html",
        inject: true,
        template: path.resolve(__dirname, "./src/index.html"),
        hash: true
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            // force: true,
            // ignore: [ '.*' ] //忽略.*的文件
          },
        ],
      }),
    ],
    //无需打包的库
    // externals: {
    //   antd: 'antd',
    // },
  }
  if (isDev) {
    options.plugins = options.plugins.concat([new webpack.HotModuleReplacementPlugin()])
    options.devtool = 'cheap-module-eval-source-map'
  } else {
    options.plugins = options.plugins.concat([
      new CleanWebpackPlugin(),
      new HardSourceWebpackPlugin(), //可能会导致缓存检查不及时，打包失败
      new MiniCssExtractPlugin({
        filename: `${version}/[name].css`,
        chunkFilename: `${version}/[name].[contenthash].css`,
      })
    ])
  }

  if (enableBundleAnalyzer) {
    options.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }))
  }

  return options
}





