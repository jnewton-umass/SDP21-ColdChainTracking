var net = require('net');
var JsonSocket = require('json-socket')
var client = new JsonSocket(new net.Socket())
client.connect(8081, '35.190.148.56', function() {
	console.log('Connected');
	client.sendMessage({
		statusId: "demoStatus",
		temperature: 30,
		light: false,
		latitude: 42.374376,
		longitude: -72.519899
	});
});
client.on('data', function(data) {
	console.log('Received: ' + data);
	client.sendEndMessage();
});
client.on('error', function(error) {
	console.log(error);
});
client.on('close', function() {
	console.log('Connection closed');
});