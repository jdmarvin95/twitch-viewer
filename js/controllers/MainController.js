app.controller('MainController', function($scope, $route, $routeParams, $location) {
	$scope.name = 'MainController'
	$scope.$route = $route
	$scope.$routeParams = $routeParams
	$scope.$location = $location

	$scope.title = 'Twitch Viewer'
	$scope.author = 'Joseph Marvin'
})