var express = require('express')
var Client = require('mariasql')
var app = express()

app.use(express.static('www'))

app.get('/', function (req, res) {
  res.send(index.html)
})

app.get('/getRows', function(req, res) {
	c.query(getRows(), function(err, rows) {
		if(err) throw err
		return res.json(rows)
	})
})

app.get('/addRow', function(req, res) {
	var dispName = req.query.DisplayName
	var name = req.query.Name
	var apiLink = req.query.ApiLink
	var twitchLink = req.query.TwitchLink
	var logo = req.query.Logo

	c.query(addRow({
		DisplayName: dispName,
		Name: name,
		ApiLink: apiLink,
		TwitchLink: twitchLink,
		Logo: logo
	}), function(err, rows) {
		if(err) throw err
	})
})

app.get('/delRow', function(req, res) {
	var name = req.query.Name

	c.query(delRow({
		Name: name
	}), function(err, rows) {
		if(err) throw err
	})
})

app.listen(8080, function () {
  console.log('App listening on port 8080')
})

var c = new Client({
	host: 'localhost',
	user: 'jdmarvin95',
	password: 'Slipknot95!',
	db: 'streamers'
})

var getRows = c.prepare('SELECT * FROM streams')
var addRow = c.prepare('INSERT INTO streams (DisplayName, Name, ApiLink, TwitchLink, Logo) VALUES (:DisplayName, :Name, :ApiLink, :TwitchLink, :Logo)')
var delRow = c.prepare('DELETE FROM streams WHERE Name = :Name')

c.end()

