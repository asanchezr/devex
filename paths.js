'use strict';

const path = require('path');

module.exports = {
	appSrc: path.join(__dirname, 'modules'),
	outputPath: path.join(__dirname, 'public', 'dist'),
	node_modules: path.join(__dirname, 'node_modules')
};
