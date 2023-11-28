var bigsmall_chart = "chartBigSmall";
var bigsmall = {};

bigsmall.changeData = function(dataSource, dateRange) {
	var data = bigsmall.Chart.config.data;
	data.datasets[0].data = dataSource;
	data.labels = bigsmall.labels;

	HomeChartCommon.ModifyYAxesRange(bigsmall.Chart, dataSource);
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
	bigsmall.Chart = new Chart(HomeChartCommon.GetContext(bigsmall_chart), {
		type: 'bar',
		data: HomeChartCommon.GenerateDataModels(bigsmall_chart),
		plugins: [ChartDataLabels],
		options: HomeChartCommon.GetOptions(),
	});
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