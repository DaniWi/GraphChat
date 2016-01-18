var ws = require("nodejs-websocket")

var clients = [];
var clientID = 1;

var server = ws.createServer(function (conn) {
	//console.log("New connection")
	clients.push(conn);
	conn.sendText("newClient_()Client" + clientID);
	clientID = clientID + 1;
	
	conn.on("text", function (str) {
		clients.forEach(function(client) {
		      client.send(str);
		});		
	})
	
	conn.on("close", function (code, reason) {
		console.log("Connection closed");
		var index = clients.indexOf(conn);
		clients.splice(index,1);
	})
}).listen(8081)