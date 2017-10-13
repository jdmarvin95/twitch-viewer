var app = angular.module('twitchApp', ['ngRoute'])

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'views/main.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})