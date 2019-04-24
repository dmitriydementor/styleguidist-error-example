const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
    components: 'src/components/**/*.vue',
    webpackConfig: {
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
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [path.join(__dirname, `./resources/assets/js`)],
                },
                {
                    test: /\.(png|gif|jpg|svg|ttf|eot|woff|woff2)$/,
                    loader: 'file-loader?name=[path][name].[ext]'
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new VueLoaderPlugin(),
        ],
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json'],
            alias: {
                vue: 'vue/dist/vue.js',
                '@': path.resolve('src')
            }
        },
    },
    require: [
        '@babel/polyfill'
    ]
};
