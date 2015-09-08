var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('client'));
app.use(bodyParser.json()); // for parsing application/json


var jsonfile = require('jsonfile')
var util = require('util')

var data, roomlog;
var dataFile = __dirname + '/log/data.json';
var roomFile = __dirname + '/log/room.json';
jsonfile.readFile(dataFile, function(err, obj) {
  data = obj || {results: []};
});
jsonfile.readFile(roomFile, function(err, obj) {
  roomlog = obj || {};
});



var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

app.use(function(req, res, next) {
  res.set(defaultCorsHeaders);
  next();
});


app.get('/classes/messages', function(req, res) {
  res.status(200).send(JSON.stringify(data));
});

app.param('room', function (req, res, next, room) {
  req.roomname = room;
  next();
})

app.post('/classes/:room', function (req, res) {
  var message = req.body;
  message.roomname = req.roomname;
  data.results.push(message);
  roomlog[req.roomname] = roomlog[req.roomname] || []; 
  roomlog[req.roomname].push(message);
  res.status(201).send(JSON.stringify({results: roomlog[req.roomname]}));
});

setInterval(saveLog, 2000);

function saveLog() {
  var dataFile = __dirname + '/log/data.json';
  var roomFile = __dirname + '/log/room.json';

  jsonfile.writeFile(dataFile, data, function (err) {
    if (err)
      console.error(err);
  });
  jsonfile.writeFile(roomFile, roomlog, function (err) {
    if (err)
      console.error(err);
  });
};

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});