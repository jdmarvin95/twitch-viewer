app.directive('streamerInfo', function() {
	return {
		restrict: 'E',
		scope: {
			info: '='
		},
		templateUrl: 'js/directives/streamerInfo.html'
	}
})