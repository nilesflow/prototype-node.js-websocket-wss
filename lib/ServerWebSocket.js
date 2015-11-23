var WebSocketServer = require('ws').Server;
var http = require('http');
var https = require('https');
var fs = require('fs');

exports.create = function(options) {
	return new ServerWebSocket(options);
}

/**
 * @constructor
 * @param options {Object} オプション
 */
function ServerWebSocket(options) {
	var httpOptions = {};

	this.port = options.port;
	if (options.protocol == 'https') {
		// key, 証明書
		httpOptions.key = fs.readFileSync(options.key);
		httpOptions.cert = fs.readFileSync(options.crt);	

	  // クライアント証明書指定
		if (options.requestCert) {
			// CA
			httpOptions.ca = [fs.readFileSync(options.ca)];

  		httpOptions.requestCert = true;
  		httpOptions.rejectUnauthorized = true;
	  }

		this.httpServer = https.createServer(httpOptions, this.onHttpAccess);
	}
	else {
		this.httpServer = http.createServer(this.onHttpAccess);
	}

	// WebSocketサーバ
	this.server = new WebSocketServer({server:this.httpServer});

	this.connections = [];
}

/**
 * @callback
 */
ServerWebSocket.prototype.onHttpAccess = function (req,res) {
  console.log('createserver');
  if (0) {
  	fs.createReadStream("index.html").pipe(res);
  } else {
  	// see node_modules/ws/lib/WebSocketServer.js
    var body = http.STATUS_CODES[426];
    res.writeHead(426, {
      'Content-Length': body.length,
      'Content-Type': 'text/plain'
    });
    res.end(body);
  }
}; 

/**
 * @public
 */
ServerWebSocket.prototype.run = function() {
	this.server.on('listening', this.onListening.bind(this));
	this.server.on('connection', this.onConnect.bind(this));

	// listen start.
	this.httpServer.listen(this.port);
};

/** 
 * @callback
 */
ServerWebSocket.prototype.onListening = function(message) {
	console.log('listening');
};

/**
 * @callback
 */
ServerWebSocket.prototype.onConnect = function(ws) {
	var self = this;

	console.log('connect');
	this.connections.push(ws);

  ws.on('close', this.onClose.bind(this, ws));
  ws.on('message', this.onMessage.bind(this, ws));
};

/**
 * @callback
 */
ServerWebSocket.prototype.onClose = function(ws) {
	this.connections = this.connections.filter(function (conn, i) {
    return (conn === ws) ? false : true;
  });	
};

/**
 * @callback
 */
ServerWebSocket.prototype.onMessage = function(ws, message) {
  this.broadcast(JSON.stringify(message));
  ws.ping('a', {mask:false}, false);	
};

/**
 * @protected
 * @override
 */
ServerWebSocket.prototype.broadcast = function(message) {
  this.connections.forEach(function (con, i) {
    con.send(message);
  });
};
