'use strict'

var http = require('http');
var url = require('url');
var fs = require('fs');

var DEFAULT_PORT = 6430;

var myWebPages = {
	"/":{"file":"html/index.html"}
}

var mimeTypes = {
	"jpg":"image/jpeg",
	"jpeg":"image/jpeg",
	"png":"image/png",
	"gif":"image/gif",
	"svg": "image/svg+xml",
	"css":"text/css",
	"js":"text/javascript"
}

function render(response, file, contentType) {	
	fs.readFile(file, function(error, data) {
		if (error) {
			response.writeHead(404);
		} else {
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		};
		response.end();
	})
}

var server = http.createServer(function(request, response) {
	var path = url.parse(request.url).pathname;
	// If path refer to an Image file
	if (path.match(/^.*\.(jpg|jpeg|png|gif|svg)$/)) {
		var file = path.substring(1);
		var m = path.match(/^.*\.(jpg|jpeg|png|gif|svg)$/);
		var fileExt = m[1];
		var contentType = mimeTypes[fileExt]
		render(response, file, contentType);
	// If path refer to a CSS file
	} else if (path.match(/^.*\.css$/)) {
		var file = path.substring(1);
		var contentType = mimeTypes['css'];
		render(response, file, contentType);
	// If path refer to a Javascript file
	} else if (path.match(/^.*\.js$/)) {
		var file = path.substring(1);
		var contentType = mimeTypes['js'];
		render(response, file, contentType);
	// If path refer to a webpage
	} else if (myWebPages[path]) {
		render(response, myWebPages[path].file, "text/html");
	} else {
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write('<p>oups</p>')
		response.end();
	}
	});

server.listen(DEFAULT_PORT);
console.log("Listening on port " + DEFAULT_PORT + "...");