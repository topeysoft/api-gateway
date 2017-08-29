var fs = require("fs");
var express = require("express");
var vhost = require("vhost");

function setup(ssl) {
  if (ssl && ssl.active) {
    return {
      key: fs.readFileSync(ssl.key),
      cert: fs.readFileSync(ssl.cert)
    };
  }
}

function start(app, options) {
  servers = {};
  if (options) servers.https = require("https").createServer(options, app);

  servers.http = require("http").createServer(app);
  return servers;
}
function setCallbacks(server, callbacks) {
  if (server && callbacks && callbacks.error && callbacks.listening) {
    server.on("error", callbacks.error);
    server.on("listening", callbacks.listening);
  }
  return server;
}

module.exports = {
  create: function(settings, app) {
    var options = setup(settings.ssl);
    var servers = start(app, options);
    // app.on('error',(err)=>{
    //   console.log('err', err);
    // })
    // app.on('listening',()=>{
    //   console.log('args',arguments);
    // })
    // app.on('request',()=>{
    //   console.log('request',arguments);
    // })
    setCallbacks(servers.http, settings.callbacks);
    servers.http.listen(settings.port, () => {
      console.info("HTTP listening on ", settings.port);
    });
    if (servers.https) {
      setCallbacks(servers.https, settings.callbacks);
      servers.https.listen(settings.s_port, () => {
        console.info("HTTPS listening on ", settings.s_port);
      });
    }
    return servers;
  }
};
