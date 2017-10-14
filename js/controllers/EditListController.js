app.controller('EditListController', ['$scope', 'GetTwitchInfo', function($scope, GetTwitchInfo) {
	$scope.addStreamer = function(name) {
		GetTwitchInfo.pushToStreamerArr(name)
	}
}])