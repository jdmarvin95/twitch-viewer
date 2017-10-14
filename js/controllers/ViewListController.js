app.controller('ViewListController', ['$scope', '$routeParams', 'GetTwitchInfo', function($scope, $routeParams, GetTwitchInfo) {
	$scope.name = 'ViewListController'
	$scope.params = $routeParams
	$scope.streamers = GetTwitchInfo
}])