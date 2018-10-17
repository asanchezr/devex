'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
	client: {
		lib: {
			css: [
				// bower:css
				'public/lib/angular-ui-notification/dist/angular-ui-notification.min.css',
				'public/lib/ng-img-crop/compile/minified/ng-img-crop.css',
				'public/lib/font-awesome/css/font-awesome.min.css',
				'public/lib/simple-line-icons/css/simple-line-icons.css'
				// endbower
			],
			js: [
				// bower:js
				'public/lib/angular/angular.min.js',
				'public/lib/angular-animate/angular-animate.min.js',
				'public/lib/ui-bootstrap4/dist/ui-bootstrap-tpls.js',
				'public/lib/angular-messages/angular-messages.min.js',
				'public/lib/angular-mocks/angular-mocks.js',
				'public/lib/angular-resource/angular-resource.min.js',
				'public/lib/angular-ui-notification/dist/angular-ui-notification.min.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-sanitize/angular-sanitize.min.js',
				'public/lib/tinymce/tinymce.min.js',
				'public/lib/angular-ui-tinymce/src/tinymce.js',
				'public/lib/angular-breadcrumb/release/angular-breadcrumb.min.js',
				'public/lib/lodash/lodash.js',
				'public/lib/ng-file-upload/ng-file-upload.min.js',
				'public/lib/ng-img-crop/compile/minified/ng-img-crop.js',
				'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
				'public/lib/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
				'public/lib/ng-idle/angular-idle.min.js',
				'public/lib/angular-touch/angular-touch.min.js'
				// endbower
			]
		},
		css: 'public/dist/application*.min.css',
		js: 'public/dist/application*.min.js'
	}
};
