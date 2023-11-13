from django.urls import path
from . import views  #引用這個資料夾中的views檔案

urlpatterns = [
    path('', views.index, name = "Index"),

    path('api/home/statistic/', views.get_home_statistic, name="api-statistic"),
    path('api/home/bigsmall/', views.get_home_bigsmall, name="api-bigsmall"),
    path('api/home/oddseven/', views.get_home_oddseven, name="api-oddseven"),
    path('api/home/tail/', views.get_home_tail, name="api-tail"),
]