/*
 * 
 */
var fs = require('fs');
var https = require('https');
var WebSocket = require('ws');
var config = require('./config.js').client;

var url = 'wss://' + config.hostname + ':' + config.port+ '/';

var options = {
  ca : fs.readFileSync(config.ssl_ca_crt),
  key : fs.readFileSync(config.ssl_client_key),
  cert : fs.readFileSync(config.ssl_client_crt),
  passphrase : config.passphrase_client,
//  passphrase : config.passphrase_pcl12,
//  pfx : fs.readFileSync(config.ssl_client_pfx),
  agent: false
};

var ws = new WebSocket(url, null, options);
ws.on('open', function() {
console.log('connect');
  var now = new Date();
  ws.send('hello, ' + now);
  ws.ping('ping');
  ws.pong('pong');
});

ws.on('message', function(message) {
  console.log('ping: %s', message);
});

ws.on('ping', function(message) {
  console.log('ping: %s', message);
});
ws.on('pong', function(message) {
  console.log('pong: %s', message);
});

ws.on('error', function(err) {
  console.log(err);
  console.trace();
});
