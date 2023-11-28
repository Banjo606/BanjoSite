var statistic_chart = "chartStatistic";
var statistic = {};

statistic.changeData = function(dataSource, dateRange) {
	var data = statistic.Chart.config.data;
	data.datasets[0].data = dataSource;
	data.labels = statistic.labels;

	HomeChartCommon.ModifyYAxesRange(statistic.Chart, dataSource);
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
	statistic.Chart = new Chart(HomeChartCommon.GetContext(statistic_chart), {
		type: 'bar',
		data: HomeChartCommon.GenerateDataModels(statistic_chart),
		plugins: [ChartDataLabels],
		options: HomeChartCommon.GetOptions(),
	});
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
