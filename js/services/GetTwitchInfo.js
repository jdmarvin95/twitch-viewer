app.factory('GetTwitchInfo', ['$http', function($http) {
	var streamerArr = ['lobosjr', 'esl_sc2', 'yogscast', 'dansgaming', 'superbestfriendsplay', 'hatfilms']
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
				var obj = {
					name: response.data.stream.channel.display_name,
					link: 'https://www.twitch.tv/' + response.data.stream.channel.display_name,
					logo: response.data.stream.channel.logo,
					status: 'Online',
					game: response.data.stream.channel.game
				}
				streamList.push(obj)
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
			var obj = {
				name: response.data.display_name,
				link: 'https://www.twitch.tv/' + streamer,
				logo: response.data.logo,
				status: 'Offline',
				game: '--'
			}
			streamList.push(obj)
			return streamList
		}

		function errorCallback(response) {
			return response
		}
	}

	return streamList
}])