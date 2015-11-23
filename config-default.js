
var server = {
  ssl_server_crt : '/etc/pki/CA/certs/dev.furoom.net-ca.crt',
  ssl_server_key : '/etc/pki/CA/private/dev.furoom.net.key',
  ssl_ca_crt : '/etc/pki/CA/cacert.pem',

  portFrontend : 55555,
  isSecureFrontend : false,

  portBackend : 55556,
  isSecureBackend : true,
  isRequestCertBackend : true,
};

exports.server = server;

var client = {
	ssl_client_crt : '/etc/pki/CA/client/certs/myclient.dev.furoom.net.crt',
	ssl_client_key : '/etc/pki/CA/client/private/myclient.dev.furoom.net.key',
	ssl_ca_crt : '/etc/pki/CA/cacert.pem',
	ssl_client_pfx : '/etc/pki/CA/client/private/myclient.dev.furoom.net.pfx',
  hostname: 'dev.furoom.net',
  port: 55556,
  passphrase_client : '', // add passphrase
  passphrase_pcl12 : '',  // add passphrase
};

exports.client = client;