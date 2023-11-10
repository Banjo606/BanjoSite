var statistic = {};

statistic.changeData = function(dataSource, dateRange) {
	var data = statistic.Chart.config.data;
	data.datasets[0].data = dataSource;
	data.labels = statistic.labels;

	var nMax = Math.max(...dataSource, 1);
	var nMin = Math.min(...dataSource);
	statistic.Chart.options.scales.yAxes[0].ticks.stepSize = (nMax >= 10 ? 0 : 1);
	// var nUpper = Math.floor(nMax * 1.05 / 5 + 0.9999) * 5;
	statistic.Chart.options.scales.yAxes[0].ticks.max = (nMax <= 20 ? nMax : nMax);
	var nLower = Math.floor(nMin * 0.9);
	statistic.Chart.options.scales.yAxes[0].ticks.suggestedMin = (nMin == 0 ? 0 : nLower);
	
	statistic.Chart.update();

	document.getElementById("StatisticRange").innerHTML = dateRange;
};

statistic.registerClick = function() {
	$("#0").click(function() { statistic.changeData(statistic.datas.w0, 	statistic.daterange.w0); });
	$("#1").click(function() { statistic.changeData(statistic.datas.n7, 	statistic.daterange.n7); });
	$("#2").click(function() { statistic.changeData(statistic.datas.w1, 	statistic.daterange.w1); });
	$("#3").click(function() { statistic.changeData(statistic.datas.m0, 	statistic.daterange.m0); });
	$("#4").click(function() { statistic.changeData(statistic.datas.n30, 	statistic.daterange.n30); });
	$("#5").click(function() { statistic.changeData(statistic.datas.m1, 	statistic.daterange.m1); });
	$("#6").click(function() { statistic.changeData(statistic.datas.n90, 	statistic.daterange.n90); });
	$("#7").click(function() { statistic.changeData(statistic.datas.n180, 	statistic.daterange.n180); });
	$("#8").click(function() { statistic.changeData(statistic.datas.y0, 	statistic.daterange.y0); });
};

function Init() {
	var Cfg = statistic_config;
	statistic.Chart = new Chart(Cfg.ctx, Cfg.config);
	statistic.registerClick();

	$.get("./api/home/statistic/", function(msg) {
		var data = JSON.parse(msg);
		statistic.labels		= data.label;
		statistic.daterange	= data.daterange;
		statistic.datas		= data;
	
		$("#0").click();
	})
	.fail(function() {
		alert( "error" );
	});
}

Init();
