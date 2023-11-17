var bigsmall_config = {};

function Init() {
	var data = bigsmall_config;
	data.options = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
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
		}
	};
	
	data.ctx = document.getElementById("chartBigSmall").getContext("2d");

	var gradientStroke = data.ctx.createLinearGradient(0, 230, 0, 50);
	gradientStroke.addColorStop(1, 'rgba(72,72,176,0.3)');
	gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.1)');
	gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors

	data.config = {
		type: 'bar',
		responsive: true,
		legend: {
			display: false
		},
		data: {
			labels: [],
			datasets: [{
				label: "次數",
				fill: true,
				backgroundColor: gradientStroke,
				hoverBackgroundColor: gradientStroke,
				borderColor: '#1f8ef1',
				borderWidth: 2,
				borderDash: [],
				borderDashOffset: 0.0,
				data: [],
			}]
		},
		options: data.options
	};
}

Init();
