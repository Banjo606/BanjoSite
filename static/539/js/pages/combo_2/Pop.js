var pop = {};

pop.changeData = function(dataSource, dateRange) {
	// pop.Chart.update();
	// return;
	var data = pop.Chart.config.data;

	var labels = Array.from(pop.labels);
	var values = Array.from(dataSource);
	for (var RR = labels.length - 2; RR >= 0; RR--) {
		for (var RR2 = RR; RR2 >= 0; RR2--) {
			var bExchange = false;
			if (values[RR2] == 0 && values[RR2 + 1] != 0) {
				bExchange = true;
			} else if (values[RR2] < values[RR2 + 1]) {
				bExchange = true;
			}

			if (bExchange) {
				var temp_label = labels[RR2];
				labels[RR2] = labels[RR2 + 1];
				labels[RR2 + 1] = temp_label;

				var temp_value = values[RR2];
				values[RR2] = values[RR2 + 1];
				values[RR2 + 1] = temp_value;
			}
		}
	}
	labels = labels.slice(0, 50);
	values = values.slice(0, 50);

	data.labels = labels;
	data.datasets[0].data = values;

	// console.log(labels);
	// console.log(values);

	var nMax = Math.max(...dataSource, 1);
	var nMin = Math.min(...dataSource);
	pop.Chart.options.scales.xAxes[0].ticks.stepSize = (nMax >= 10 ? 0 : 1);
	// var nUpper = Math.floor(nMax * 1.05 / 5 + 0.9999) * 5;
	pop.Chart.options.scales.xAxes[0].ticks.max = (nMax <= 20 ? nMax : nMax);
	var nLower = Math.floor(nMin * 0.9);
	pop.Chart.options.scales.xAxes[0].ticks.suggestedMin = (nMin == 0 ? 0 : nLower);
	
	pop.Chart.update();

	document.getElementById("PopRange").innerHTML = dateRange;
};

pop.registerClick = function() {
	$("#0").click(function() { pop.changeData(pop.datas.w0, 	pop.daterange.w0); });
	$("#1").click(function() { pop.changeData(pop.datas.n7, 	pop.daterange.n7); });
	$("#2").click(function() { pop.changeData(pop.datas.w1, 	pop.daterange.w1); });
	$("#3").click(function() { pop.changeData(pop.datas.m0, 	pop.daterange.m0); });
	$("#4").click(function() { pop.changeData(pop.datas.n30, 	pop.daterange.n30); });
	$("#5").click(function() { pop.changeData(pop.datas.m1, 	pop.daterange.m1); });
	$("#6").click(function() { pop.changeData(pop.datas.n90, 	pop.daterange.n90); });
	$("#7").click(function() { pop.changeData(pop.datas.n180, 	pop.daterange.n180); });
	$("#8").click(function() { pop.changeData(pop.datas.y0, 	pop.daterange.y0); });
};

function Init() {
	var Cfg = pop_config;
	pop.Chart = new Chart(Cfg.ctx, Cfg.config);
	pop.registerClick();

	$.get("./api/combo_2/pop/", function(msg) {
		// console.log(msg);
		var data = JSON.parse(msg);
		pop.labels		= data.labels;
		pop.daterange	= data.daterange;
		pop.datas		= data;
	
		$("#0").click();
	})
	.fail(function() {
		alert( "error" );
	});
}

Init();
