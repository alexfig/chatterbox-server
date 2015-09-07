/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var data = {results: []};
var roomlog = {};
var urlParser = require('url');
var fs = require('fs');
var jsonfile = require('jsonfile')
var util = require('util')

var dataFile = __dirname + '/log/data.json';
var roomFile = __dirname + '/log/room.json';
jsonfile.readFile(dataFile, function(err, obj) {
  data = obj || {results: []};
});
jsonfile.readFile(roomFile, function(err, obj) {
  roomlog = obj || {};
});

var requestHandler = function(request, response) {

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "text/plain";

  var parsedUrl = urlParser.parse(request.url);

  if (parsedUrl.pathname === '/classes/messages') {
    if (request.method === 'GET') {
      response.writeHead(statusCode, headers);
      return response.end(JSON.stringify(data));  
    }
  }  
  else if (parsedUrl.pathname.match(/^\/classes\/(.+)$/)) {
    console.log('room found');
    var room = parsedUrl.pathname.match(/^\/classes\/(.+)$/);
    if (request.method === 'GET') {

      roomlog[room[1]] = roomlog[room[1]] || []; 
      response.writeHead(statusCode, headers);
      return response.end(JSON.stringify({results: roomlog[room[1]] }));  
    }
    else if (request.method === 'POST') {
      var body = '';
      request.on('data', function (data) {
        body += data;
      });
      request.on('end', function () {
        var message = JSON.parse(body);
        message.roomname = room[1];
        data.results.push(message);
        roomlog[room[1]] = roomlog[room[1]] || []; 
        roomlog[room[1]].push(message);
        statusCode = 201;
        response.writeHead(statusCode, headers);
        return response.end(JSON.stringify({results: roomlog[room[1]] }));  
      });
    }
    else if (request.method === 'OPTIONS') {
      response.writeHead(statusCode, headers);
      return response.end();  
    }
  }
  else {
    var path = parsedUrl.pathname;

    if (path === '/')
      path = '/index.html';


    fs.readFile(__dirname + '/client' + path, function(err, data) {
      if (err) {
        statusCode = 404;
        response.writeHead(404, headers);
        return response.end('Error loading ' + path);
      }
      else {
        statusCode = 200;
        headers['Content-Type'] = "text/html";
        response.writeHead(statusCode);
        return response.end(data);
      }
    });
  }

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
};

module.exports.requestHandler = requestHandler;
module.exports.saveLog = function() {
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

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

