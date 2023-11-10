from datetime import datetime, timedelta

def getConfig():
	# ----------   Label  ----------
	config = [];
	weekday = datetime.today().weekday()
	todaydate = datetime.today()
	yesterday = datetime(todaydate.year, todaydate.month, todaydate.day) - timedelta(days = 1)
	
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

def getOddsEven(num):
	if (num % 2 == 1):
		return 1
	else:
		return 2

@decorQuery
def myStatistics(queryset, dict):
	for obj in queryset:
		dict[getOddsEven(obj.num_1)] += 1
		dict[getOddsEven(obj.num_2)] += 1
		dict[getOddsEven(obj.num_3)] += 1
		dict[getOddsEven(obj.num_4)] += 1
		dict[getOddsEven(obj.num_5)] += 1

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
	
def OddsEvenCalcProb(history):
	configs = getConfig()

	# ----------   Init   ----------
	dict_all = {}
	for one_config in configs:
		key = one_config['fieldname']
		dict_all[key] = {}
		for RR in range(1, 3):
			dict_all[key][RR] = 0

	# ----------Statistics----------
	for one_config in configs:
		startdate	= one_config['startdate']
		enddate		= one_config['enddate']
		key			= one_config['fieldname']
		myStatistics(history, startdate, enddate, dict_all[key])

	# ----------   Data   ----------
	context = { 'daterange': getDateRange(configs) }
	for one_config in configs:
		key = one_config['fieldname']
		context[key] = list(dict_all[key].values())

	return context