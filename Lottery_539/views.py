from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from . models import history

from . api.home.statistic	import StatisticCalcProb
from . api.home.bigsmall	import BigSmallCalcProb
from . api.home.oddseven	import OddsEvenCalcProb
from . api.home.tail		import TailCalcProb
from . api.combo_2.pop		import PopCalcProb

# Create your views here.
def index(request):
	return render(request, '539/pages/home.html')

@login_required(login_url='/accounts/auth-signin')
def combo_2(request):
	return render(request, '539/pages/combo_2.html')





# ==============================  API  ==============================
# ----------   home   ----------
def get_home_statistic(request):
	context = StatisticCalcProb(history)
	return render(request, '539/api/home/Statistic.html', context)

def get_home_bigsmall(request):
	context = BigSmallCalcProb(history)
	return render(request, '539/api/home/BigSmall.html', context)

def get_home_oddseven(request):
	context = OddsEvenCalcProb(history)
	return render(request, '539/api/home/OddsEven.html', context)

def get_home_tail(request):
	context = TailCalcProb(history)
	return render(request, '539/api/home/Tail.html', context)

# ----------  combo_2 ----------
def get_combo_2_pop(request):
	context = PopCalcProb(history)
	return render(request, '539/api/combo_2/Pop.html', context)
