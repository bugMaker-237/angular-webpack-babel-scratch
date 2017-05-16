import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default (DEBUG, PATH, PORT=3000) => ({
  entry: {
    vendor : (DEBUG ? [
        `webpack-dev-server/client?http://localhost:${PORT}`,
      ] : []).concat([
        
        //vendors
        'babel-polyfill',
        'angular',
        'angular-animate',
        'angular-aria',
        'angular-ui-router',
        'angular-material',
        'angular-material/angular-material.min.css',
        //app
        './src/assets/styles/main.css',
        './src/app/main'
      ]),
      app : (DEBUG ? [
      ] : [
        './src/assets/styles/main.css',
        './src/app/main'
      ])
  },

  output: {
    path: path.resolve(__dirname, PATH, DEBUG ? "app" : ""),
    filename: DEBUG ? 'main.js' : 'js/[name]-[hash].js',
    publicPath: DEBUG ? "/app/" : "./"
  },

  cache: DEBUG,
  debug: DEBUG,

  // For options, see http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG && "eval",

  module: {
    loaders: [
      // Load ES6/JSX
      { test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        loader: "babel-loader",
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015'],
        }
      },

      // Load styles
      { test: /\.css$/,
        loader: DEBUG
          ? "style!css!autoprefixer!less"
          : ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
      },
      {
        test: /\.scss$/,
        use: DEBUG ? [ {
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader",
          options: {
            includePaths: [ "absolute/path/a", "absolute/path/b" ]
          }
        }] : extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
      },
      // Load images
      { test: /\.jpg/, loader: "url-loader?name=images/[hash][name].[ext]&limit=10000&mimetype=image/jpg" },
      { test: /\.gif/, loader: "url-loader?name=images/[hash][name].[ext]&limit=10000&mimetype=image/gif" },
      { test: /\.png/, loader: "url-loader?name=images/[hash][name].[ext]&limit=10000&mimetype=image/png" },
      { test: /\.svg/, loader: "url-loader?name=images/[hash][name].[ext]&limit=10000&mimetype=image/svg" },
      {
          test: /\.mp4|\.mp3/,
          loader: 'file-loader?name=media/[hash][name].[ext]'
      },
      // Load fonts
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[hash][name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=assets/[hash][name].[ext]" },

      //Load html
      {
          test: /\.html$/,
            loader: 'file?name=templates/[name]-[hash:6].html'
      }
    ]
  },

  plugins: DEBUG
    ? [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
      })
    ]
    : [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new ExtractTextPlugin("style.css", {allChunks: false}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
        mangle: {screw_ie8: true, keep_fnames: true}
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new ExtractTextPlugin({
          filename: "[name].[contenthash].css",
          disable: process.env.NODE_ENV === "development"
      })
    ],

  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
  },

  resolve: {
    root: path.join(__dirname, "node_modules"),

    modulesDirectories: ['node_modules'],

    alias: {
      environment: DEBUG
        ? path.resolve(__dirname, 'config', 'environments', 'development.js')
        : path.resolve(__dirname, 'config', 'environments', 'production.js')
    },

    // Allow to omit extensions when requiring these files
    extensions: ["", ".js"],
  }
});
