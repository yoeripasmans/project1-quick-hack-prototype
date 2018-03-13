const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
	},

	module: {
		rules: [
			// Add babel-loader to compile ES6 to ES5
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'stage-0']
					},
				}],
			},
			// Add sass-loader to compile scss to css
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract([
					'css-loader', 'sass-loader'
				]),
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets/images/'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets/fonts/'
				}
			},
			{
				test: /\.(csv|tsv)$/,
				use: [
					'csv-loader'
				]
			},
		]
	},
	devtool: 'inline-source-map',
	plugins: [
		new ExtractTextPlugin({
			filename: 'bundle.css',
			allChunks: true,
		}),
  ],

  // Automatically reload the page when compilation is done.
  devServer: {
    port: 3000,
    compress: true,
    contentBase: 'public/',
  },

};
