var fs = require('fs');
var https = require('https');
var config = require('./config.js').client;

var options = {
  hostname: config.hostname,
  port: config.port,
  path: '/',
  method: 'GET',
  ca : fs.readFileSync(config.ssl_ca_crt),
  key : fs.readFileSync(config.ssl_client_key),
  cert : fs.readFileSync(config.ssl_client_crt),
  passphrase : config.passphrase_client,
//  passphrase : config.passphrase_pcl12,
//  pfx : fs.readFileSync(config.ssl_client_pfx),
  agent: false
};

var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});
