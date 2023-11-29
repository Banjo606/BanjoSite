var pop = {};

pop.FillUp = function(labels, values) {
	var dict = {};

	for (var RR = 0; RR < labels.length; RR++) {
		var index_str = labels[RR].toString();
		dict[index_str] = true;
	}

	for (var RR = 1; RR <= 38; RR++) {
		for (var RR2 = RR + 1; RR2 <= 39; RR2++) {
			var index = RR * 100 + RR2;
			var index_str = index.toString();
			if (!dict[index_str]) {
				labels.push(index);
				values.push(0);
			}
		}
	}

	return [ labels, values ];
}

pop.SortData = function(labels, values) {
	for (var RR = 0; RR < labels.length - 1; RR++) {
		for (var RR2 = RR + 1; RR2 < labels.length; RR2++) {
			var bExchange = false;
			
			if (!bExchange && values[RR] < values[RR2])
				bExchange = true;

			if (!bExchange && values[RR] == values[RR2] && labels[RR] > labels[RR2])
				bExchange = true;

			if (bExchange) {
				var temp_label = labels[RR];
				labels[RR] = labels[RR2];
				labels[RR2] = temp_label;

				var temp_value = values[RR];
				values[RR] = values[RR2];
				values[RR2] = temp_value;
			}
		}
	}

	return [ labels, values ];
}

pop.WrapHtmlLabel = function(label, param, html) {
	if (param)
		return `<${label} ${param}>${html}</${label}>`;
	else
		return `<${label}>${html}</${label}>`;
}

pop.NumberFormat = function(num, len = 2) {
	return `${num}`.padStart(len, '0');
}

pop.getTimesAndCombo = function(labels, values) {
	var ctx = "";
	var merge_start = 0;
	var DL = -1;
	while (true) {
		DL += 1;

		var bOutOfRange = DL + 1 >= values.length;
		var bMerge = false
		if (bOutOfRange)
			bMerge = true;
		else if (values[DL] != values[DL + 1])
			bMerge = true;

		if (bMerge) {
			var combo = "";
			for (var RR = merge_start; RR <= DL; RR++) {
				var [ num_1, num_2 ] = Combo2Common.ConvertIndexToNumber(labels[RR]);
				if (merge_start != RR) {
					if ((merge_start - RR) % 8 == 0)
						combo += "<br />"
					else
						combo += (RR != merge_start ? "、" : "");
				}

				combo += pop.WrapHtmlLabel("div", `class="ball-div"`, 
					pop.WrapHtmlLabel("p", null, pop.NumberFormat(num_1))
				) + pop.WrapHtmlLabel("div", `class="ball-div"`, 
					pop.WrapHtmlLabel("p", null, pop.NumberFormat(num_2))
				);
			}

			ctx += pop.WrapHtmlLabel("tr", null,
				pop.WrapHtmlLabel("td", `class="text-center"`, values[DL]) +
				pop.WrapHtmlLabel("td", `class="text-center"`, combo)
			);

			merge_start = DL + 1;
		}

		if (bOutOfRange)
			break;
	}

	return ctx;
}

pop.changeData = function(dataSource, dateRange) {
	var labels = Array.from(pop.labels);
	var values = Array.from(dataSource);
	
	[ labels, values ] = pop.FillUp(labels, values);
	[ labels, values ] = pop.SortData(labels, values);

	var ctx = pop.WrapHtmlLabel("table", `class="table tablesorter"`,
		pop.WrapHtmlLabel("thead", `class=" text-primary"`,
			pop.WrapHtmlLabel("tr", null,
				pop.WrapHtmlLabel("th", `class="text-center"`, "次數") +
				pop.WrapHtmlLabel("th", `class="text-center"`, "組合")
			)
		) +
		pop.WrapHtmlLabel("tbody", null, pop.getTimesAndCombo(labels, values))
	);
	
	document.getElementById("tablePop").innerHTML = ctx;
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
