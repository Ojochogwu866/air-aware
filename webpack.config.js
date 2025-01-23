const path = require('path');

module.exports = {
	entry: './src/background.ts',
	output: {
		filename: 'background.js',
		path: path.resolve(__dirname, 'build'),
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
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
		extensions: ['.ts', '.js', '.css'],
	},
};