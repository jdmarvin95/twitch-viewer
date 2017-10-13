var app = angular.module('twitchApp', ['ngRoute'])

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'html/views/main.html'
		})
		.when('/main', {
			controller: 'MainController',
			templateUrl: 'html/views/main.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})