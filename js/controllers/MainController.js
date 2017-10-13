app.controller('MainController', ['$scope', 'GetTwitchInfo', function($scope, GetTwitchInfo) {
	$scope.title = 'Twitch Viewer'
	$scope.author = 'Joseph Marvin'
	$scope.info = GetTwitchInfo
}])