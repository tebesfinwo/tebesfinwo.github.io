const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


const nodeEnv = process.env.NODE_ENV || 'production';

const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].css',
    disable: false
});

module.exports = {
    entry: './frontend/js/app.js',
    watch: true,
    mode: nodeEnv,
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options : {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        extractSass,
        new CleanWebpackPlugin([
            'assets/(css|js)'
        ]),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(nodeEnv),
        })
    ]
};
