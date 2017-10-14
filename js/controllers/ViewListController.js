app.controller('ViewListController', ['$scope', 'GetTwitchInfo', function($scope,  GetTwitchInfo) {
	$scope.streamers = GetTwitchInfo.streamList

	$scope.addStreamer = function() {
		var val = document.getElementById('add-name').value
		GetTwitchInfo.pushToStreamerArr(val)
	}

	$scope.removeStreamer = function(ele_id) {
		var element = document.getElementById(ele_id).getAttribute('id')
		GetTwitchInfo.removeFromStreamerArr(element)
	}

	$scope.sortByName = function() {
		GetTwitchInfo.sortByName(GetTwitchInfo.streamList)
	}

	$scope.sortByOnline = function() {
		GetTwitchInfo.sortByOnline(GetTwitchInfo.streamList)
	}

	$scope.sortByGame = function() {
		GetTwitchInfo.sortByGame(GetTwitchInfo.streamList)
	}
}])