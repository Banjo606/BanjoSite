
function ShowNotification(from, align, kind = 0, text) {
	const types = [ "info", "warning", "danger" ];
	const icons = [ "icon-bell-55", "icon-alert-circle-exc", "icon-simple-remove" ];

	$.notify({
		icon: "tim-icons " + icons[kind],
		message: text
	}, {
		type: types[kind],
		placement: {
			from: from,
			align: align
		},
		showDuration: 500,
		delay: 2000,
		autoHideDelay: 500,
	});
}
