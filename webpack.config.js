const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		popup: './src/index.tsx',
		background: './src/background.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		},
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			chunks: ['popup'],
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'background.html',
			chunks: ['background'],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'public/manifest.json' },
				{ from: 'public/icons', to: 'icons' },
			],
		}),
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devtool: 'cheap-source-map',
};
