'use strict'

var FlexiApp = require('../flexi-server');

var app = new FlexiApp();
app.DEFAULT_PORT = 8080;
app.myWebPages = {
	"/":{"file":"html/index.html"},
	"/toto":{"file":"html/index.html"}
};
app.run()