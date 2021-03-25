function plotter() {
	plot = document.getElementById('plot');
	var data = [{
		x: [1,2,3,4,5,6,7,8,9,10],
		y: [1,2,3,4,5,6,7,8,9,10]
	}]
		
	var layout = {
		margin: { r: 0, t: 0, b: 0, l: 0 }
	};
	Plotly.newPlot(plot, data, layout);
} module.exports = {plotter};