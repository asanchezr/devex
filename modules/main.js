'use strict';

var _ = require('lodash');
var glob = require('glob');
var assets = require('../config/assets/default');

// TODO: List all client-side modules with glob

var paths = [];
assets.client.js.forEach(function (globPattern) {
	var files = glob.sync(globPattern);
	paths = _.union(paths, files);
});



// js: [
// 	'modules/core/client/app/config.js',
// 	'modules/core/client/app/init.js',
// 	'modules/*/client/*.js',
// 	'modules/*/client/**/*.js',
// 	'public/js/bc-devx.js'
// ]

