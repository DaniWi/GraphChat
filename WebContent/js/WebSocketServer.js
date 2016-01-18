var ws = require("nodejs-websocket")

var clients = [];

var server = ws.createServer(function (conn) {
	console.log("New connection")
	clients.push(conn);
	
	conn.on("text", function (str) {
		//console.log("Received "+str)
		//conn.sendText(str)
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