var time = document.getElementById('time').innerHTML.split(',');
var longitude = document.getElementById('longitude').innerHTML.split(',');
var latitude = document.getElementById('latitude').innerHTML.split(',');
var avgTemp = document.getElementById('avgTemp').innerHTML.split(',');
var tempSide = document.getElementById('tempSide').innerHTML.split(',');
var tempCeil = document.getElementById('tempCeil').innerHTML.split(',');
var avgTempValues = [];
var tempSideValues = [];
var tempCeilValues = [];
avgTemp.forEach(result => {
	avgTempValues.push(parseInt(result));
});
tempCeil.forEach(result => {
	tempCeilValues.push(parseInt(result));
});
tempSide.forEach(result => {
	tempSideValues.push(parseInt(result));
});
var geodata = [
	{
		type: 'scattermapbox',
		mode: 'lines+markers+text',
		text: time,
		text: avgTemp,
		lon: longitude,
		lat: latitude,
		marker: {
			cmax: 90.0,
			cmin: 30.0,
			size: 10,
			color: avgTempValues,
			colorscale: 'RdBu',
			showscale: true,
			line: {width: 2, color: 'rgba(0,0,0,0)'}
		},
		colorbar: {
			thickness: 15,
			x: 3
		},
		name: 'Average Ambient Temperature'
	}
];
var geolayout = {
	title: {text:'Temperature (degrees F) Records Throughout Transportation', font:{family:'Arial', size: 30, color: 'black'}},
	dragMode: 'zoom',
	mapbox: { style: "open-street-map", center: { lat: parseFloat(latitude[0]), lon: parseFloat(longitude[0]) }, zoom: 8 },
	margin: { r: 0, t: 70, b: 0, l: 0 },
	coloraxis: {colorbar: {title: {text: 'Temperature (deg F)'},font:{family:'Arial', size: 30, color: 'black'}, side: "top"}}
};
Plotly.newPlot('geoplot', geodata, geolayout);

var tempLineData = [
	{
		type: 'scatter',
		mode: 'lines+markers',
		name: 'Ceiling Temperature',
		x: time,
		y: tempCeilValues,
		marker: {
			cmax: 90.0,
			cmin: 30.0,
			size: 12,
			color: tempCeilValues,
			colorscale: 'RdBu',
			showscale: false,
			line: {width: 2}
		}
	},
	{
		type: 'scatter',
		mode: 'lines+markers',
		name: 'Side Temperature',
		x: time,
		y: tempSideValues,
		marker: {
			cmax: 90.0,
			cmin: 30.0,
			size: 12,
			color: tempSideValues,
			colorscale: 'RdBu',
			showscale: false,
			line: {width: 2}
		}
	},
	{
		type: 'scatter',
		mode: 'lines+markers',
		name: 'Average Temperature',
		x: time,
		y: avgTempValues,
		marker: {
			cmax: 90.0,
			cmin: 30.0,
			size: 12,
			color: avgTempValues,
			colorscale: 'RdBu',
			showscale: false,
			line: {width: 2}
		}
	}
]
var tempLineLayout =
	{
		autosize: true,
		title: {text:'Temperature vs. Update Time (EST)', font:{family:'Arial', size: 30, color: 'black'}},
		showlegend: true,
		xaxis: {
			visible: true,
			showline: true,
			showgrid: true,
			showticklabels: true,
			linecolor: 'black',
			autotick: true,
			tickcolor: 'black',
			side: 'left'
		},
		yaxis: {
			visible: true,
			showgrid: true,
			zeroline: true,
			showline: true,
			showticklabels: true,
			title: {text:'Temperature (Fahrenheight)', font:{family:'Arial', size: 20, color: 'black'}},
			showtitle: true,
			side: 'left'
		},
		margin: { r: 0, t: 75, b: 180, l: 75 }
	}	
Plotly.newPlot('lineplot', tempLineData, tempLineLayout)