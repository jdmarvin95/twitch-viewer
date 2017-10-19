const express = require('express')
const Client = require('mariasql')
const app = express()

app.use(express.static('www'))

app.get('/', function (req, res) {
  res.send(index.html)
})

app.get('/addRow', function(req, res) {
	var dispName = req.query.DisplayName
	var name = req.query.Name
	var apiLink = req.query.ApiLink
	var twitchLink = req.query.TwitchLink
	var logo = req.query.Logo

	c.query('INSERT INTO streams (DisplayName, Name, ApiLink, TwitchLink, Logo) VALUES (:DisplayName, :Name, :ApiLink, :TwitchLink, :Logo)', {
		DisplayName: dispName,
		Name: name,
		ApiLink: apiLink,
		TwitchLink: twitchLink,
		Logo: logo
	}, function(err, rows) {
		if(err) throw err
	})
})

app.listen(8080, function () {
  console.log('App listening on port 8080')
})

const c = new Client({
	host: 'localhost',
	user: 'jdmarvin95',
	password: 'Slipknot95!',
	db: 'streamers'
})

c.query('SELECT * FROM streams', function(err, rows) {
	if(err) throw err
	var dbRows = rows

	app.get('/getRows', function(req, res) {
		return res.json(dbRows)
	})
})

var delRow = c.prepare('DELETE FROM streams WHERE Name = :Name')

// c.query(addRow({
// 	DisplayName: 'SuperBestFriendsPlay',
// 	Name: 'superbestfriendsplay',
// 	ApiLink: 'https://api.twitch.tv/kraken/streams/superbestfriendsplay?client_id=iqs4zor9q0wcwvpuselud1811eg881',
// 	TwitchLink: 'https://www.twitch.tv/superbestfriendsplay',
// 	Logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/superbestfriendsplay-profile_image-efe1de9446286860-300x300.jpeg'
// }), function(err, rows) {
// 	if(err) throw err
// 	console.dir(rows)
// })

c.end()

