var net = require('net');
//const mes1 = 'ExamplePlot 40.6 45.2 0 42.374320 -72.519899 1618088265000';
const gatewayId = 'ExamplePlot'
var client = new net.Socket();
client.connect(8081, 'localhost', function() {
	console.log('Connected');
});
let lat = 42.37;
let lon = -72.52;
let  time = 1618786333;
const numMsg = 250;
function msgGenerator(index) {
	var light;
	let tempSide = (Math.random() * (82 - 25) + 25);
	let tempCeil = (tempSide + (2*Math.random()));
	tempSide = tempSide.toString();
	tempCeil = tempCeil.toString();
	if (parseInt(tempCeil) > 75 || parseInt(tempSide) > 75) {
		light = '1';
	}
	else {
		light = '0';
	}
	lat = lat - Math.random()/20;
	lon = lon - Math.random()/18;
	time = time + 60000;
	let msg = gatewayId + ' ' + tempCeil + ' ' + tempSide + ' ' + light + ' ' + lat.toString() + ' ' + lon.toString() + ' ' + time.toString() + '\n';
	return new Promise(resolve => {
		console.log(index + ': ' + msg);
		client.write(msg);
		client.on('data', function() {
			resolve();
		})
	})
}

async function syncFor() {
	for (let index = 0; index < numMsg; index++) {
		await msgGenerator(index);
	}
	client.end();
}
syncFor();