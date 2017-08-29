#!/usr/bin/env node

"use strict";
let ArgManager= require('./arg-manager').ArgManager;
var express = require('express');
// var tsclogger = require('tscconsole');
var debug = require("debug")("express:server");
var http = require("http");
let ApiGateway= require('../dist/cjs/gateway').ApiGateway;
let ConfigManager= require('../dist/cjs/services/config-manager').ConfigManager;


var boot = ApiGateway.bootstrap();
var app = express();
app.use(boot.getApp());

// tsclogger.init(app);
// var mqttServer = boot.mqttServer;
var httpServers;
var httpPort=ArgManager.getPort();
var httpsPort=ArgManager.getSecurePort();

app.set("port", httpPort);
app.set("s-port", httpsPort);

var ssl = ConfigManager.get('ssl');
var callbacks = { error: onError, listening: onListening };
httpServers = require('./starter').create({
  port: httpPort,
  s_port: httpsPort,
  ssl: ssl,
  callbacks: callbacks
}, app);



/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  Object.keys(httpServers).forEach(key => {
    var httpServer = httpServers[key];
    var addr = httpServer.address()||{};
    var bind = typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr.port;
    debug("Listening on " + bind);
  })
}