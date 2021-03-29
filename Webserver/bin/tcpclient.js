var net = require('net');
var client = new net.Socket()
const mes1 = 'demoGateway 40.6 45.2 0 42.374376 -72.519899 628021800000'
const mes2 = 'demoGateway 44.6 45.2 0 42.374376 -72.519899 628021800000'
const mes3 = 'demoGateway 56.3 52.6 1 42.374376 -72.519899 628021800000'
const mes4 = 'demoGateway 57.9 57.8 1 42.374376 -72.519899 628021800000'
const mes5 = 'demoGateway 71.9 70.5 1 42.374376 -72.519899 628021800000'
const mes6 = 'demoGateway 80.6 80.2 1 42.374376 -72.519899 628021800000'
const mes = [mes1,mes2,mes3,mes4,mes5,mes6]

client.connect(8081, '35.190.148.56', function() {
	console.log('Connected');
	client.on('data', function(data) {
		console.log('Received: ' + data);
	});
	client.on('error', function(error) {
		console.log(error);
	});
	client.on('close', function() {
		console.log('Connection closed');
	});
	client.write(mes[i]);
	client.end();
});
function transmit() {

}