from django.shortcuts import render
from django.http.response import HttpResponse
from . models import history
from . api.home.statistic import StatisticCalcProb
from . api.home.bigsmall import BigSmallCalcProb
from . api.home.oddseven import OddsEvenCalcProb
from . api.home.tail import TailCalcProb

# Create your views here.
def index(request):
    return render(request, '539/pages/home.html')






# ==============================  API  ==============================
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
