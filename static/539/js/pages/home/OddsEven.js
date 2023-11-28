var oddseven_chart = "chartOddsEven";
var oddseven = {};

oddseven.changeData = function(dataSource, dateRange) {
	var data = oddseven.Chart.config.data;
	data.datasets[0].data = dataSource;
	data.labels = oddseven.labels;

	HomeChartCommon.ModifyYAxesRange(oddseven.Chart, dataSource);
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
	oddseven.Chart = new Chart(HomeChartCommon.GetContext(oddseven_chart), {
		type: 'bar',
		data: HomeChartCommon.GenerateDataModels(oddseven_chart),
		plugins: [ChartDataLabels],
		options: HomeChartCommon.GetOptions(),
	});
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