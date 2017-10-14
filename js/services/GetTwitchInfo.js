app.factory('GetTwitchInfo', ['$http', function($http) {
	var streamerArr = ['esl_sc2', 'dansgaming', 'superbestfriendsplay', 'hatfilms', 'lobosjr', 'magic', 'epiclan1', 'asusrog']
	var streamList = []
	var nameSort = false
	var onlineSort = false
	var gameSort = false

	function pushToStreamerArr(name) {
		streamerArr.push(name)
		getStreamInfo(streamerArr.length - 1)
	}

	function removeFromStreamerArr(ind) {
		streamerArr.splice(ind, 1)
		streamList.splice(ind, 1)
	}

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
				game: ''
			}
			streamList.push(obj)
			return streamList
		}

		function errorCallback(response) {
			return response
		}
	}

	function sortByName(arr) {
		var tempArr = arr
		if(!nameSort) {
			tempArr.sort(function(a, b) {
				if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
				if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
				return 0
			})
			nameSort = true
		} else {
			tempArr.sort(function(a, b) {
				if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
				if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
				return 0
			})
			nameSort = false
		}
		onlineSort = false
		gameSort = false
		return tempArr
	}

	function sortByOnline(arr) {
		var tempArr = arr
		if(!onlineSort) {
			tempArr.sort(function(a, b) {
				var o1 = a.status.toLowerCase()
				var o2 = b.status.toLowerCase()
				var n1 = a.name.toLowerCase()
				var n2 = b.name.toLowerCase()

				if(o1 > o2) return -1
				if(o1 < o2) return 1
				if(n1 < n2) return -1
				if(n1 > n2) return 1
				return 0
			})
			onlineSort = true
		} else {
			tempArr.sort(function(a, b) {
				var o1 = a.status.toLowerCase()
				var o2 = b.status.toLowerCase()
				var n1 = a.name.toLowerCase()
				var n2 = b.name.toLowerCase()

				if(o1 < o2) return -1
				if(o1 > o2) return 1
				if(n1 < n2) return -1
				if(n1 > n2) return 1
				return 0
			})
			onlineSort = false
		}
		nameSort = false
		gameSort = false
		return tempArr
	}

	function sortByGame(arr) {
		var tempArr = arr
		var offArr = []
		if(!gameSort) {
			tempArr.sort(function(a, b) {
				var g1 = a.game.toLowerCase()
				var g2 = b.game.toLowerCase()
				var n1 = a.name.toLowerCase()
				var n2 = b.name.toLowerCase()

				if(g1 < g2) return -1
				if(g1 > g2) return 1
				if(n1 < n2) return -1
				if(n1 > n2) return 1
				return 0
			})
			var len = tempArr.length
			for(var i = 0; i < len; i++) {
				if(tempArr[i].game == '') {
					tempArr.push(tempArr.splice(i, 1)[0])
					i--
					len--
				}
			}
			gameSort = true
		} else {
			tempArr.sort(function(a, b) {
				var g1 = a.game.toLowerCase()
				var g2 = b.game.toLowerCase()
				var n1 = a.name.toLowerCase()
				var n2 = b.name.toLowerCase()

				if(g1 > g2) return -1
				if(g1 < g2) return 1
				if(n1 < n2) return -1
				if(n1 > n2) return 1
				return 0
			})
			var len = tempArr.length
			for(var i = 0; i < len; i++) {
				if(tempArr[i].game == '') {
					tempArr.push(tempArr.splice(i, 1)[0])
					i--
					len--
				}
			}
			gameSort = false
		}
		nameSort = false
		onlineSort = false
		return tempArr
	}

	return {
		streamerArr: streamerArr,
		streamList: streamList,
		pushToStreamerArr: pushToStreamerArr,
		removeFromStreamerArr: removeFromStreamerArr,
		sortByName: sortByName,
		sortByOnline: sortByOnline,
		sortByGame: sortByGame
	}
}])