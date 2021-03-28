var net = require('net');
var client = new net.Socket()
const mes = 'NEW 63.6 64.2 0 42.374376 -72.519899 628021800000'
client.connect(8081, 'localhost', function() {
	console.log('Connected');
	client.write(mes);
});
client.on('data', function(data) {
	console.log('Received: ' + data);
});
client.on('error', function(error) {
	console.log(error);
});
client.on('close', function() {
	console.log('Connection closed');
});