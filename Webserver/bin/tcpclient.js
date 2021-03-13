var net = require('net');
var client = new net.Socket()
const mes = 'NEW 51 50 0 42.374376 -72.519899'
client.connect(8081, '35.190.148.56', function() {
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