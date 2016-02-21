// requirements ================================================================
console.log("node: starting...");
var express = require('express');                               // handle de controller part
var morgan = require('morgan');                                 // log requests to the console (express4)
var bodyParser = require('body-parser');                        // pull information from HTML POST (express4)
var methodOverride = require('method-override');                // simulate DELETE and PUT (express4)
var fs = require('fs');                                         // node default file system manager
var mysql = require('mysql');                                   // connection db type
var Sequelize = require('sequelize');                           // node ORM for mySQL
var epilogue = require('epilogue');                             // node restfull for sequelize
var port = 8080;
// server configurations =======================================================
console.log("express: configuring...");
app = express();
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/modulos'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.get('*', function(req, res) {
    res.sendFile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
console.log("express: configured!");
// sequelize db ================================================================
console.log("sequelize: connecting...");
// Define your models
var modelsPaths = require("path").join(__dirname, "models");    // getting all models files
var modelsFiles = fs.readdirSync(modelsPaths);                  // reading all models files
var models      = {};
var sequelize   = new Sequelize('hype', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});
// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: sequelize
});
// Create REST resource for each models
modelsFiles.forEach(function(name){
  var endpoints = name.slice(0, -3).toLowerCase() + 's';
  endpoints = ['/rest/'+endpoints,'/rest/'+endpoints+'/:id'];
  models[name.slice(0, -3)] = require('./models/'+name)(Sequelize, sequelize);
  var resource = epilogue.resource({
    model: models[name.slice(0, -3)],
    endpoints: endpoints
  });
});
modelsFiles.forEach(function(name){
  if ("associate" in models[name.slice(0, -3)]) {
    models[name.slice(0, -3)].associate(models);
  }
});
// Create database and listen
sequelize.sync({ force: true }).then(function() {
  console.log("sequelize: connected!");
  // listen (start app with node server.js) ====================================
  console.log("node: opening port...");
  app.listen(port);
  console.log("node: listening on port " + port);
  // pronto! está rodando ======================================================
});
