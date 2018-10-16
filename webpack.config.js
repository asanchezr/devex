const merge = require('webpack-merge');
const path = require('path');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

const parts = require('./webpack.parts');
const paths = require('./paths');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const ASSET_PATH = process.env.ASSET_PATH || '/';


const envFile = {};
if (dotenv.parsed) {
	Object.keys(dotenv.parsed).map(key => {
		envFile[key] = JSON.stringify(dotenv.parsed[key]);
	});
}

const commonConfig = merge([
	{
		entry: {
			main: path.join(paths.appSrc, 'main.js'),
			vendor: path.join(paths.appSrc, 'vendor.js')
		},
		output: {
			path: paths.outputPath,
			filename: '[name].bundle.js'
		}
	}
]);

// TODO:
const devConfig = merge([
	parts.devServer({
		// Parse host and port from env to allow customization.
		//
		// If you use Docker, set
		// host: options.host || "0.0.0.0";
		//
		// 0.0.0.0 is available to all network devices
		// unlike default `localhost`.
		host: process.env.HOST || '0.0.0.0',
		port: process.env.PORT
	})
]);

// TODO:
const prodConfig = merge([]);

module.exports = (mode) => {
	if (mode === PRODUCTION) {
		return merge(commonConfig, prodConfig, { mode });
	}

	// always default to development config
	return merge(commonConfig, devConfig, { mode });
};
