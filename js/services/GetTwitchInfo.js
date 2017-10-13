app.factory('GetTwitchInfo', ['$http', function($http) {
	var streamerArr = ['lobosjr', 'esl_sc2', 'yogscast', 'superbestfriendsplay', 'hatfilms']
	var streamList = []

	// for(var i = 0; i < streamerArr.length; i++)
	// {
	// 	$http.get('https://api.twitch.tv/kraken/streams/' + streamerArr[i] + '?client_id=iqs4zor9q0wcwvpuselud1811eg881')
	// 	.then(successCallback, errorCallback)

	// 	function successCallback(response) {
	// 		if(response.data.stream != null)
	// 		{
	// 			info = response.data.stream.channel.display_name
	// 			streamList.push(info)
	// 			return streamList
	// 		}
	// 		else
	// 		{
	// 			info = "Channel Offline"
	// 			streamList.push(info)
	// 			return streamList
	// 		}
	// 	}

	// 	function errorCallback(response) {
	// 		return response
	// 	}
	// }

	// return streamList

	getStreamInfo(0)

	function getStreamInfo(i) {
		return $http.get('https://api.twitch.tv/kraken/streams/' + streamerArr[i] + '?client_id=iqs4zor9q0wcwvpuselud1811eg881')
		.then(successCallback, errorCallback)

		function successCallback(response) {
			if(response.data.stream != null) {
				streamList.push(response.data.stream.channel.display_name)
			} else {
				getOfflineInfo(streamerArr[i])
			}
			i++
			
			if(i < streamerArr.length) {
				getStreamInfo(i)
			}	

			return streamList
		}

		function errorCallback(response) {
			return response
		}
	}

	function getOfflineInfo(streamer) {
		return $http.get('https://api.twitch.tv/kraken/users/' + streamer + '?client_id=iqs4zor9q0wcwvpuselud1811eg881')
		.then(successCallback, errorCallback)

		function successCallback(response) {
			streamList.push(response.data.display_name + " (Offline)")
			return streamList
		}

		function errorCallback(response) {
			return response
		}
	}

	return streamList
}])