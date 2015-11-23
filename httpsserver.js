var https = require('https');
var fs = require('fs');

var ssl_server_crt = '/etc/pki/CA/certs/dev.furoom.net-ca.crt';
var ssl_server_key = '/etc/pki/CA/private/dev.furoom.net.key';
var ssl_ca_crt = '/etc/pki/CA/cacert.pem';
var port = 55556;
 
var options = {
  key: fs.readFileSync(ssl_server_key),
  cert: fs.readFileSync(ssl_server_crt),
  ca: [fs.readFileSync(ssl_ca_crt)],
  requestCert: true,
  rejectUnauthorized : true,
};

var servers = https.createServer(options, function (req,res) {
	fs.createReadStream("index.html").pipe(res);
}).listen(port);

servers.listen(55556);
