const webpack = require( 'webpack' );
const pkg = require( './package' );
const path = require( 'path' );

const banner = `${ pkg.name } ${ pkg.version }\nCopyright (c) ${ new Date().getFullYear() } ${ pkg.author }\nLicense: ${ pkg.license }`;
const externals = {
	'@wordpress/editor': { this: [ 'wp', 'editor' ] },
	'@wordpress/element': { this: [ 'wp', 'element' ] },
	'@wordpress/hooks': { this: [ 'wp', 'hooks' ] },
	'@wordpress/components': { this: [ 'wp', 'components' ] },
	'@wordpress/rich-text': { this: [ 'wp', 'richText' ] },
	lodash: 'lodash',
};

const webpackConfig = {
	context: __dirname + '/src',
	entry: './index.js',
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'index.js',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	externals,
	plugins: [
		new webpack.BannerPlugin( banner ),
	],
};

module.exports = webpackConfig;