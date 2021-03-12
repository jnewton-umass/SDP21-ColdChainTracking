var net = require('net');
var client = new net.Socket()
const mes = '{"statusId": "HEy", "temperature": 30, "light": false, "latitude": 42.374376, "longitude": -72.519899}'
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