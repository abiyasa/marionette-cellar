/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global console, exports, require, module */

/**
 * Module dependencies.
 */
var express = require('express'), routes = require('./routes/route.js');

var app = module.exports = express();

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/../public'));  
    app.use(express.static(__dirname + '/../client'));  
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
app.get('/api/wines/:id?', routes.wineGet);
app.post('/api/wines/:id?', routes.wineCreate);
app.del('/api/wines/:id?', routes.wineDelete);
app.put('/api/wines/:id?', routes.wineUpdate);
app.get('/api/*', function(req, res) {
    // unsupported API
    res.send(false);
});

// starts yo!
var portNum = 3000;
app.listen(portNum);
console.log("Express server listening on port %d",  portNum);
