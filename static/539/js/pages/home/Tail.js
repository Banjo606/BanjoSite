var tail = {};

tail.changeData = function(dataSource, dateRange) {
	var data = tail.Chart.config.data;
	data.datasets[0].data = dataSource;
	data.labels = tail.labels;

	var nMax = Math.max(...dataSource, 1);
	var nMin = Math.min(...dataSource);
	tail.Chart.options.scales.y.ticks.stepSize = (nMax >= 10 ? 0 : 1);
	// var nUpper = Math.floor(nMax * 1.05 / 5 + 0.9999) * 5;
	tail.Chart.options.scales.y.ticks.max = (nMax <= 20 ? nMax : nMax);
	var nLower = Math.floor(nMin * 0.9);
	nLower = (nMax - nLower < 10 ? (nMax > 10 ? nMax - 10 : 0) : nLower);
	tail.Chart.options.scales.y.ticks.suggestedMin = (nMin == 0 ? 0 : nLower);
	
	tail.Chart.update();

	document.getElementById("TailRange").innerHTML = dateRange;
};

tail.registerClick = function() {
	$("#30").click(function() { tail.changeData(tail.datas.w0, 		tail.daterange.w0); });
	$("#31").click(function() { tail.changeData(tail.datas.n7, 		tail.daterange.n7); });
	$("#32").click(function() { tail.changeData(tail.datas.w1, 		tail.daterange.w1); });
	$("#33").click(function() { tail.changeData(tail.datas.m0, 		tail.daterange.m0); });
	$("#34").click(function() { tail.changeData(tail.datas.n30, 	tail.daterange.n30); });
	$("#35").click(function() { tail.changeData(tail.datas.m1, 		tail.daterange.m1); });
	$("#36").click(function() { tail.changeData(tail.datas.n90, 	tail.daterange.n90); });
	$("#37").click(function() { tail.changeData(tail.datas.n180, 	tail.daterange.n180); });
	$("#38").click(function() { tail.changeData(tail.datas.y0, 		tail.daterange.y0); });
};

function Init() {
	var Cfg = tail_config;
	tail.Chart = new Chart(Cfg.ctx, Cfg.config);
	tail.registerClick();

	$.get("./api/home/tail/", function(msg) {
		var data = JSON.parse(msg);
		tail.labels		= data.label;
		tail.daterange	= data.daterange;
		tail.datas		= data;
	
		$("#30").click();
	})
	.fail(function() {
		alert( "error" );
	});
}

Init();