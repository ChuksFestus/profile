const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const javascript = {
	test: /\.(js)$/,
	use: [{
		loader: "babel-loader",
		options: {
			presets: ["env"]
		}
	}],
}

const image = {
	test: /\.jpg/,
	use: "file-loader"
}

const style = {
	test: /\.(css)/,
	use: ExtractTextPlugin.extract({
		use: [
			{
				loader: "css-loader",
				options: { importLoaders: 1, minimize: true },
			},
			"postcss-loader"
		],
	}),
}

const fonts = {
	test: /Font\.css/,
	use: ExtractTextPlugin.extract({
		use: 'css-loader',
	})
}

const fontType = {
	test: /\.(ttf)$/,
	use: ['url-loader'],
}

const uglify = new webpack.optimize.UglifyJsPlugin();

const config = {
	entry: {
		app: "./src/app.js"
	},

	module: {
		loaders: [javascript, style, image, fonts, fontType]
	},

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js"
	},

	plugins: [
		new ExtractTextPlugin("[name].bundle.css"),
		new ExtractTextPlugin('fonts.css'),
		uglify
	]
}

module.exports = config;