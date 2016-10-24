'use strict'

var http = require('http');
var url = require('url');
var fs = require('fs');

function FlexiApp() {
	this.DEFAULT_PORT = 6430;
	this.myWebPages = {};
	this.mimeTypes = {
		"jpg":"image/jpeg",
		"jpeg":"image/jpeg",
		"png":"image/png",
		"gif":"image/gif",
		"svg": "image/svg+xml",
		"css":"text/css",
		"js":"text/javascript"
	};
};

FlexiApp.prototype.render = function(response, file, contentType) {
	fs.readFile(file, function(error, data) {
		if (error) {
			response.writeHead(404);
		} else {
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		};
		response.end();
	});
};

FlexiApp.prototype.run = function() {
	var self = this;
	var server = http.createServer(function(request, response) {
  		var method = request.method;
  		var locator = request.url;
		console.log(method, locator);
		var path = url.parse(request.url).pathname;
		// If path refer to an Image file
		if (path.match(/^.*\.(jpg|jpeg|png|gif|svg)$/)) {
			var file = path.substring(1);
			var m = path.match(/^.*\.(jpg|jpeg|png|gif|svg)$/);
			var fileExt = m[1];
			var contentType = self.mimeTypes[fileExt]
			self.render(response, file, contentType);
		// If path refer to a CSS file
		} else if (path.match(/^.*\.css$/)) {
			var file = path.substring(1);
			var contentType = self.mimeTypes['css'];
			self.render(response, file, contentType);
		// If path refer to a Javascript file
		} else if (path.match(/^.*\.js$/)) {
			var file = path.substring(1);
			var contentType = self.mimeTypes['js'];
			self.render(response, file, contentType);
		// If path refer to a webpage
		} else if (self.myWebPages[path]) {
			self.render(response, self.myWebPages[path].file, "text/html");
		} else {
			response.writeHead(404, {"Content-Type": "text/html"});
			response.write('<p>oups</p>')
			response.end();
		}
	});
	server.listen(self.DEFAULT_PORT);
	console.log("Listening on port " + self.DEFAULT_PORT + "...");
};

module.exports = FlexiApp;