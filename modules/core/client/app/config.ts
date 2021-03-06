/* tslint:disable */
import angular from 'angular';

(function(window) {
	'use strict';

	var applicationModuleName = 'mean';

	var service = {
		applicationEnvironment: (window as any).env,
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: [
			'ngAnimate',
			'ngResource',
			'ngMessages',
			'ui.router',
			'ui.bootstrap',
			'ui.tinymce',
			'ngFileUpload',
			'ngImgCrop',
			'ui-notification',
			'ncy-angular-breadcrumb',
			'dndLists',
			'ngIdle',
			'ngSanitize',
			'ui.bootstrap',
			'ng-currency'
		],
		registerModule: registerModule
	};

	(window as any).ApplicationConfiguration = service;

	// Add a new vertical module
	function registerModule(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	}

	// Angular-ui-notification configuration
	angular.module('ui-notification').config([
		'NotificationProvider',
		function(NotificationProvider) {
			NotificationProvider.setOptions({
				delay: 2000,
				startTop: 20,
				startRight: 10,
				verticalSpacing: 20,
				horizontalSpacing: 20,
				positionX: 'right',
				positionY: 'bottom'
			});
		}
	]);

	// Angular idle configuration
	angular.module('ngIdle').config([
		'IdleProvider',
		'KeepaliveProvider',
		function(IdleProvider, KeepaliveProvider) {
			IdleProvider.idle(Number((window as any).sessionTimeoutWarning));
			IdleProvider.timeout(Number((window as any).sessionTimeout));
			KeepaliveProvider.interval(2);
		}
	]);
}(window));
