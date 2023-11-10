from django.shortcuts import render
from django.http.response import HttpResponse
from . models import history
from . api.home.statistic import StatisticCalcProb

# Create your views here.
def index(request):
    return render(request, '539/pages/home.html')






# ==============================  API  ==============================
def get_home_statistic(request):
    context = StatisticCalcProb(history)
    return render(request, '539/api/home/Statistic.html', context)

