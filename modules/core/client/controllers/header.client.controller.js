(function() {
	'use strict';

	angular
		.module('core')
		.controller('HeaderController', HeaderController)
		.controller('WarningModalController', WarningModalController)
		.controller('TimeoutModalController', TimeoutModalController);

	HeaderController.$inject = [
		'$rootScope',
		'$scope',
		'$state',
		'$location',
		'Authentication',
		'menuService',
		'$uibModal',
		'Idle',
		'MessagesService'
	];

	WarningModalController.$inject = ['$scope', 'Idle'];

	function HeaderController(
		$rootScope,
		$scope,
		$state,
		$location,
		Authentication,
		menuService,
		$uibModal,
		Idle,
		MessagesService
	) {
		var vm = this;
		vm.accountMenu = menuService.getMenu('account').items[0];
		vm.authentication = Authentication;
		vm.isCollapsed = false;
		vm.menu = menuService.getMenu('topbar');

		if (Authentication.user) {
			updateMessageCount();
			setAvatarImage(vm.authentication.user);
		}

		$rootScope.$on('updateMessageCount', function() {
			updateMessageCount();
		});

		$rootScope.$on('userSignedIn', function(event, data) {
			setAvatarImage(data);
		});

		function setAvatarImage(userData) {
			if (
				userData.profileImageURL.indexOf('http://') !== 0 &&
				userData.profileImageURL.indexOf('https://') !== 0
			) {
				vm.avatarImageURL = window.location.origin + '/' + userData.profileImageURL;
			} else {
				vm.avatarImageURL = userData.profileImageURL;
			}
		}

		function updateMessageCount() {
			MessagesService.mycount(function(response) {
				vm.messageCount = response.count;
			});
		}

		$scope.$on('$stateChangeSuccess', stateChangeSuccess);
		$scope.isHomePage = function() {
			var path = $location.path();
			return !path || path === '/';
		};
		$scope.isActiveMenu = function(item) {
			var route = item.state || '',
				active = $state.current.name || '',
				mr = route.match(/^(.*)\.(list)$/),
				ma = active.match(/^(.*)\.(edit|view|list)$/);
			if (mr) route = mr[1];
			if (ma) active = ma[1];
			if (route === active) return true;
			if (route === 'admin' && active.substring(0, 5) === 'admin') return true;
		};

		/**
		 * Functions for handling session timeout warnings
		 */

		// if signed in, start a session timer
		if (vm.authentication.user) {
			Idle.watch();
		}

		$scope.$on('IdleStart', function() {
			vm.warning = $uibModal.open({
				size: 'sm',
				animation: true,
				templateUrl: '/modules/core/client/views/modal.timeout.warning.html',
				windowClass: 'modal-timeout-warning-dialog',
				backdrop: 'static',
				bindToController: true,
				controllerAs: 'qqq',
				controller: 'WarningModalController'
			});
		});

		$scope.$on('IdleTimeout', function() {
			vm.warning.close();

			// instruct the server to terminate the session
			var client = new XMLHttpRequest();
			client.open('GET', '/api/auth/signout');
			client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
			client.send();

			$scope.timedout = $uibModal.open({
				size: 'sm',
				templateUrl: '/modules/core/client/views/modal.timeout.html',
				windowClass: 'modal-timeout-dialog',
				backdrop: 'static',
				bindToController: true,
				controllerAs: 'qqq',
				controller: 'TimeoutModalController'
			});
		});

		$scope.$on('IdleEnd', function() {
			vm.warning.close();
		});

		function stateChangeSuccess() {
			// Collapsing the menu after navigation
			vm.isCollapsed = false;
		}
	}

	function WarningModalController($scope, Idle) {
		var qqq = this;
		qqq.countdown = Idle.getTimeout();
		qqq.max = Idle.getTimeout();

		qqq.getCountdownInMinutes = function() {
			return Math.floor(qqq.countdown / 60);
		};

		$scope.$on('IdleWarn', function(e, countdown) {
			$scope.$apply(function() {
				qqq.countdown = countdown;
			});
		});
	}

	function TimeoutModalController() {
		var qqq = this;
		// inform user and provide option to sign back in
		qqq.handleClickOK = function() {
			window.location.href = '/authentication/signin';
		};
	}
}());
