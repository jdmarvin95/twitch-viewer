app.controller('MainController', ['$scope', function($scope, $route, $routeParams, $location) {
	$scope.name = 'MainController'
	$scope.$route = $route
	$scope.$location = $location
	$scope.$routeParams = $routeParams

	$scope.title = 'Twitch Viewer'
	$scope.author = 'Joseph Marvin'
}])