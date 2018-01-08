let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = (DEBUG, PATH, PORT = 4900) => ({
    entry: () => {
        if (DEBUG === true) {
            return {
                vendor: [
                    //vendors
                    `webpack-dev-server/client?http://localhost:${PORT}`,
                    'angular',
                    'angular-animate',
                    'angular-aria',
                    'angular-ui-router',
                    'angular-material',
                    'angular-material/angular-material.min.css'
                ],
                app: [
                    './src/assets/styles/main.scss',
                    './src/app/services/services',
                    './src/app/modules/modules',
                    // './src/app/directives/directives',
                    './src/app/components/components',
                    './src/app/main'
                ]
            }
        } else {
            return {
                'vendor.code': [
                    'angular',
                    'angular-ui-router'
                ],
                'vendor.design': [
                    'angular-animate',
                    'angular-aria',
                    'angular-material',
                    'angular-material/angular-material.min.css',
                ],
                'app.services': [
                    './src/app/services/services'
                ],
                'app.components': [
                    './src/app/components/components',
                    // './src/app/directives/directives'
                ],
                'app.modules': [
                    './src/app/modules/modules'
                ],
                'app.main': [
                    './src/app/main',
                    './src/assets/styles/main.scss'
                ]
            }
        }
    },
    output: {
        path: path.resolve(__dirname, PATH),
        filename: 'js/[name].js',
        publicPath: DEBUG ? '/' : './'
    },
    cache: DEBUG,

    // For options, see http://webpack.github.io/docs/configuration.html#devtool
    devtool: DEBUG && "eval",
    module: {
        rules: [{
                test: /\.(scss|css)$/,
                use: DEBUG ? [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }] : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader?name=images/[name].[ext]'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
                ]
            },
            {
                test: /\.svg/,
                use: ["file-loader?name=svg/[name].[ext]"]
            },
            {
                test: /\.mp4|\.mp3/,
                use: ['file-loader?name=media/[name].[ext]']
            },
            {
                test: /\.html$/,
                include: [
                    path.resolve(__dirname, "src/app"),
                ],
                use: ['file-loader?name=templates/[name]-[hash:6].html']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        cacheDirectory: true,
                    }
                }
            }
        ]
    },
    plugins: DEBUG ? [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // })
    ] : [
        new CleanWebpackPlugin(['build']),
        // new webpack.optimize.OccurrenceOrderPlugin({}),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 25
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: true,
            mangle: true,
            beautify: false,
            comments: false,
            fromString: true,
            spidermonkey: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: "css/[name].css",
            allChunks: true
        })
    ],
    resolve: {
        modules: ['node_modules', 'src'],

        alias: {
            environment: DEBUG ?
                path.resolve(__dirname, 'config', 'environments', 'development.js') : path.resolve(__dirname, 'config', 'environments', 'production.js'),
            _img: path.resolve(__dirname, 'src', 'assets', 'images'),
            _svg: path.resolve(__dirname, 'src', 'assets', 'icons')
        },

        // Allow to omit extensions when requiring these files
        extensions: [".*", ".js", ".scss", ".css"],
    }

})