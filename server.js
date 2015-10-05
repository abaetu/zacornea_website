#!/bin/env node
/**
 * Module dependencies.
 */
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')

var app = express();
app.use(express.compress());
app.configure(function(){
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/contact', routes.contact);
app.get('/legislatie', routes.legislatie);
app.get('/servicii', routes.servicii);
app.get('/intrebari', routes.intrebari);
//app.get('*', function(req,res){res.send("Page not found", 404)});



http.createServer(app).listen(app.get('port'), ipaddress, function(){
  console.log("Express server listening on port " + app.get('port'));
});
