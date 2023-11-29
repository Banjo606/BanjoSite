var Combo2Common = {};

Combo2Common.ConvertNumberToIndex = function(num_1, num_2) {
	return num_1 * 100 + num_2;
}

Combo2Common.ConvertIndexToNumber = function(index) {
	return [Math.floor(index / 100), index % 100];
}

Combo2Common.IsValidIndex = function(index) {
	var [ num_1, num_2 ] = Combo2Common.ConvertIndexToNumber(index);
	return num_1 < num_2;
}

Combo2Common.GetContext = function(chart_name) {
	return document.getElementById(chart_name).getContext("2d");
}

Combo2Common.GetOptions = function() {
	return {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
				position: 'left',
			},
			datalabels: {
				color: 'white',
				anchor: 'end',
				align: 'right',
				formatter: Math.round,
				font: {
					weight: 'bold',
					size: 16
				}
			},
		},
		tooltips: {
			backgroundColor: '#f5f5f5',
			titleFontColor: '#333',
			bodyFontColor: '#666',
			bodySpacing: 4,
			xPadding: 12,
			mode: "nearest",
			intersect: 0,
			position: "nearest"
		},
		responsive: true,
		scales: {
			y: {
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.1)',
					zeroLineColor: "transparent",
				},
				ticks: {
					padding: 20,
					fontColor: "#9e9e9e",
				}
			},
	
			x: {
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.1)',
					zeroLineColor: "transparent",
				},
				ticks: {
					padding: 20,
					fontColor: "#9e9e9e"
				}
			}
		},
		indexAxis: 'y',
	};
}

Combo2Common.GenerateDataModels = function(chart_name) {
	var ctx = Combo2Common.GetContext(chart_name);
	var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
	gradientStroke.addColorStop(1.0, "rgba( 72,  72, 176, 0.3)");
	gradientStroke.addColorStop(0.4, "rgba( 72,  72, 176, 0.1)");
	gradientStroke.addColorStop(0.0, "rgba(119,  52, 169, 0.0)");

	return {
		labels: [],
		datasets: [{
			axis: 'y',
			fill: true,
			backgroundColor: gradientStroke,
			hoverBackgroundColor: gradientStroke,
			borderColor: '#1f8ef1',
			borderWidth: 2,
			borderDash: [],
			borderDashOffset: 0.0,
		}]
	};
}

Combo2Common.ModifyXAxesRange = function(chart, datas) {
	var nMax = Math.max(...datas, 1);
	var nMin = Math.min(...datas);
	var lower = Math.floor(nMax - (nMax - nMin) * 1.5);
	if (lower < 0) lower = 0;

	chart.options.scales.x.ticks.stepSize = (nMax >= 10 ? 0 : 1);
	chart.options.scales.x.max = (nMax <= 20 ? nMax : nMax);
	chart.options.scales.x.min = (nMin == 0 ? 0 : lower);
}
