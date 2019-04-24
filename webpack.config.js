const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        app: ['./src/app.ts'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        pathinfo: false,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        'css': 'vue-style-loader!css-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader //'style-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ['ie >= 8', 'last 10 version']
                                })
                            ],
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|gif|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, `./resources/assets/js`)],
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            vue: 'vue/dist/vue.js',
            '@': path.resolve('src')
        }
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
    ]
};

module.exports = (env, argv) => {

    if (process.env.NODE_ENV === 'development') {
        config.mode = 'development';
        config.devtool = 'inline-source-map';
        config.plugins = (config.plugins || []).concat([
            new WebpackNotifierPlugin({
                alwaysNotify: true
            }),
        ]);

        const tsLoader = config.module.rules.find(rule => rule.loader === 'ts-loader');
        tsLoader.options.transpileOnly = true;
        tsLoader.options.experimentalWatchApi = true;
    }

    if (process.env.NODE_ENV === 'production') {
        config.mode = 'production';
        config.optimization = {
            minimize: true
        };

        // http://vue-loader.vuejs.org/en/workflow/production.html
        config.plugins = (config.plugins || []).concat([
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new WebpackNotifierPlugin({
                alwaysNotify: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]);
    }

    return config;
};
