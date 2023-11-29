from datetime import datetime, timedelta

def getConfig():
	# ----------   Label  ----------
	config = [];
	weekday = datetime.today().weekday()
	todaydate = datetime.today()
	yesterday = datetime(todaydate.year, todaydate.month, todaydate.day) - timedelta(days = 1)

	# ----------這  禮  拜----------
	config.append({
		'fieldname':	'w0',
		'startdate':	todaydate - timedelta(days = weekday),
		'enddate':		yesterday
	})
	
	# ----------近  ７  日----------
	config.append({
		'fieldname':	'n7',
		'startdate':	yesterday - timedelta(days = 6),
		'enddate':		yesterday
	})
	
	# ----------上  禮  拜----------
	config.append({
		'fieldname':	'w1',
		'startdate':	todaydate - timedelta(days = weekday + 7),
		'enddate':		todaydate - timedelta(days = weekday + 1)
	})

	# ----------這  個  月----------
	config.append({
		'fieldname':	'm0',
		'startdate':	datetime(todaydate.year, todaydate.month, 1),
		'enddate':		yesterday
	})

	# ----------近  30  日----------
	config.append({
		'fieldname':	'n30',
		'startdate':	yesterday - timedelta(days = 30),
		'enddate':		yesterday
	})

	# ----------上  個  月----------
	config.append({
		'fieldname':	'm1',
		'startdate':	datetime(todaydate.year, todaydate.month - 1, 1),
		'enddate':		datetime(todaydate.year, todaydate.month - 0, 1) - timedelta(days = 1)
	})

	# ----------近  90  天----------
	config.append({
		'fieldname':	'n90',
		'startdate':	yesterday - timedelta(days = 90),
		'enddate':		yesterday
	})

	# ----------近  180 天----------
	config.append({
		'fieldname':	'n180',
		'startdate':	yesterday - timedelta(days = 180),
		'enddate':		yesterday
	})

	# ----------近  一  年----------
	config.append({
		'fieldname':	'y0',
		'startdate':	yesterday - timedelta(days = 365),
		'enddate':		yesterday
	})

	# ----------  return  ---------- 
	return config

def decorQuery(func):
	def wrap(history, startdate, enddate, dict):
		queryData = history.objects.filter(drawdate__range=[startdate, enddate])
		return func(queryData, dict)
	return wrap

def NumberToIndex(num1, num2):
	return min(num1, num2) * 100 + max(num1, num2)

@decorQuery
def myStatistics(queryset, dict):
	for obj in queryset:
		num = [ obj.num_1, obj.num_2, obj.num_3, obj.num_4, obj.num_5 ]
		
		for n1 in range(0, 4):
			for n2 in range(n1 + 1, 5):
				combo = NumberToIndex(num[n1], num[n2])
				if (combo not in dict):
					dict[combo] = 0
				dict[combo] = dict[combo] + 1

def getDateRange(config):
	data = {}
	strData = ''
	count = 0
	for one_config in config:
		count += 1
		key = one_config['fieldname']
		startdate	= one_config['startdate']
		enddate		= one_config['enddate']
		data[key] = startdate.strftime('%Y/%m/%d') + ' ~ ' + enddate.strftime('%Y/%m/%d')
		if (count != 1):
			strData += ', '
		strData += '{ "' + key + '": "' + startdate.strftime('%Y/%m/%d') + ' ~ ' + enddate.strftime('%Y/%m/%d') + '" }'

	return data

def getComboValueList(numCombos, dict):
	list = []
	for combo in numCombos:
		list.append(dict[combo] if combo in dict else 0)

	return list

def PopCalcProb(history):
	configs = getConfig()

	# ----------   Init   ----------
	dict_all = {}
	dict_all['labels'] = set()
	for one_config in configs:
		key = one_config['fieldname']
		dict_all[key] = {}

	# ----------Statistics----------
	for one_config in configs:
		startdate	= one_config['startdate']
		enddate		= one_config['enddate']
		key			= one_config['fieldname']
		myStatistics(history, startdate, enddate, dict_all[key])

	# ----------  Refresh ----------
	for one_config in configs:
		key = one_config['fieldname']
		for dict in dict_all[key]:
			if (dict not in dict_all['labels']):
				dict_all['labels'].add(dict)

	# ----------   Data   ----------
	context = {}
	context['labels'] = dict_all['labels']
	context['daterange'] = getDateRange(configs)
	for one_config in configs:
		key = one_config['fieldname']
		# context[key] = { "label": list(dict_all[key].keys()), "value": list(dict_all[key].values())}
		# context[key] = json.dumps(dict_all[key])
		context[key] = getComboValueList(dict_all['labels'], dict_all[key])

	return context
