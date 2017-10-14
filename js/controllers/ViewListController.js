app.controller('ViewListController', ['$scope', 'GetTwitchInfo', function($scope,  GetTwitchInfo) {
	$scope.streamers = GetTwitchInfo.streamList

	$scope.addStreamer = function(name) {
		GetTwitchInfo.pushToStreamerArr(name)
		console.log(GetTwitchInfo.streamerArr[GetTwitchInfo.streamerArr.length - 1])
	}
}])