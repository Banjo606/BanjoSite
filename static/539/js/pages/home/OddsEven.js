var oddseven = {};

oddseven.changeData = function(dataSource, dateRange) {
	var data = oddseven.Chart.config.data;
	data.datasets[0].data = dataSource;
	data.labels = oddseven.labels;

	var nMax = Math.max(...dataSource, 1);
	var nMin = Math.min(...dataSource);
	oddseven.Chart.options.scales.y.ticks.stepSize = (nMax >= 10 ? 0 : 1);
	// var nUpper = Math.floor(nMax * 1.05 / 5 + 0.9999) * 5;
	oddseven.Chart.options.scales.y.ticks.max = (nMax <= 20 ? nMax : nMax);
	var nLower = Math.floor(nMin * 0.9);
	nLower = (nMax - nLower < 10 ? (nMax > 10 ? nMax - 10 : 0) : nLower);
	oddseven.Chart.options.scales.y.ticks.suggestedMin = (nMin == 0 ? 0 : nLower);
	
	oddseven.Chart.update();

	document.getElementById("OddsEvenRange").innerHTML = dateRange;
};

oddseven.registerClick = function() {
	$("#21").click(function() { oddseven.changeData(oddseven.datas.n7, 		oddseven.daterange.n7); });
	$("#22").click(function() { oddseven.changeData(oddseven.datas.w1, 		oddseven.daterange.w1); });
	$("#23").click(function() { oddseven.changeData(oddseven.datas.n30, 	oddseven.daterange.n30); });
	$("#24").click(function() { oddseven.changeData(oddseven.datas.m1, 		oddseven.daterange.m1); });
	$("#25").click(function() { oddseven.changeData(oddseven.datas.n90, 	oddseven.daterange.n90); });
	$("#26").click(function() { oddseven.changeData(oddseven.datas.n180, 	oddseven.daterange.n180); });
	$("#27").click(function() { oddseven.changeData(oddseven.datas.y0, 		oddseven.daterange.y0); });
};

function Init() {
	var Cfg = oddseven_config;
	oddseven.Chart = new Chart(Cfg.ctx, Cfg.config);
	oddseven.registerClick();

	$.get("./api/home/oddseven/", function(msg) {
		var data = JSON.parse(msg);
		oddseven.labels		= data.label;
		oddseven.daterange	= data.daterange;
		oddseven.datas		= data;
	
		$("#21").click();
	})
	.fail(function() {
		alert( "error" );
	});
}

Init();