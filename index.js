var config = require('./config.js').server;
var serverWebSocket = require(process.cwd() + '/lib/ServerWebSocket');

// HTTPサーバ
var options = makeOptions(config.portFrontend, config.isSecureFrontend);
var server = serverWebSocket.create(options);
server.run();

// HTTPSサーバ
var options = makeOptions(config.portBackend, config.isSecureBackend, config.isRequestCertBackend);
var serverWss = serverWebSocket.create(options);
serverWss.run();

/**
 * @param {Integer} port ポート
 */
function makeOptions(port, isSecure, isRequestCert) {
  var options = {
    port : port,
  };

  if (isSecure) {
    options.protocol = 'https',
    options.key = config.ssl_server_key;
    options.crt = config.ssl_server_crt;

    if (isRequestCert) {
      options.requestCert = true;
      options.ca = config.ssl_ca_crt;
    }
  }
  return options;
};