var net = require('net');
var client = new net.Socket();
client.connect(8081, '35.190.148.56', function() {
	console.log('Connected');
	client.write('{"statusId": "demoStatusyes", "temperature": 20, "light": false, "latitude": 42.361784, "longitude": -72.487846 }');
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