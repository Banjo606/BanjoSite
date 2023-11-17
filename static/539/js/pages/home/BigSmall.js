var bigsmall = {};

bigsmall.changeData = function(dataSource, dateRange) {
	var data = bigsmall.Chart.config.data;
	data.datasets[0].data = dataSource;
	data.labels = bigsmall.labels;

	var nMax = Math.max(...dataSource, 1);
	var nMin = Math.min(...dataSource);
	bigsmall.Chart.options.scales.y.ticks.stepSize = (nMax >= 10 ? 0 : 1);
	// var nUpper = Math.floor(nMax * 1.05 / 5 + 0.9999) * 5;
	bigsmall.Chart.options.scales.y.ticks.max = (nMax <= 20 ? nMax : nMax);
	var nLower = Math.floor(nMin * 0.9);
	nLower = (nMax - nLower < 10 ? (nMax > 10 ? nMax - 10 : 0) : nLower);
	bigsmall.Chart.options.scales.y.ticks.suggestedMin = (nMin == 0 ? 0 : nLower);
	
	bigsmall.Chart.update();

	document.getElementById("BigSmallRange").innerHTML = dateRange;
};

bigsmall.registerClick = function() {
	$("#11").click(function() { bigsmall.changeData(bigsmall.datas.n7, 		bigsmall.daterange.n7); });
	$("#12").click(function() { bigsmall.changeData(bigsmall.datas.w1, 		bigsmall.daterange.w1); });
	$("#13").click(function() { bigsmall.changeData(bigsmall.datas.n30, 	bigsmall.daterange.n30); });
	$("#14").click(function() { bigsmall.changeData(bigsmall.datas.m1, 		bigsmall.daterange.m1); });
	$("#15").click(function() { bigsmall.changeData(bigsmall.datas.n90, 	bigsmall.daterange.n90); });
	$("#16").click(function() { bigsmall.changeData(bigsmall.datas.n180, 	bigsmall.daterange.n180); });
	$("#17").click(function() { bigsmall.changeData(bigsmall.datas.y0, 		bigsmall.daterange.y0); });
};

function Init() {
	var Cfg = bigsmall_config;
	bigsmall.Chart = new Chart(Cfg.ctx, Cfg.config);
	bigsmall.registerClick();

	$.get("./api/home/bigsmall/", function(msg) {
		var data = JSON.parse(msg);
		bigsmall.labels		= data.label;
		bigsmall.daterange	= data.daterange;
		bigsmall.datas		= data;
	
		$("#11").click();
	})
	.fail(function() {
		alert( "error" );
	});
}

Init();