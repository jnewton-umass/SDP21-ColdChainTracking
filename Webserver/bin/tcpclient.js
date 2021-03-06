var net = require('net');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
  });
var client = new net.Socket();
client.connect(8081, '', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
	readline.question('Response: ', res => {
		client.write(res);
		readline.close();
	});
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	readline.question('Response: ', res => {
		client.write(res);
		readline.close();
	});
});
client.on('error', function(error) {
	console.log(error);
});
client.on('close', function() {
	console.log('Connection closed');
});