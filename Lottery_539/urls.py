from django.urls import path
from . import views  #引用這個資料夾中的views檔案

urlpatterns = [
	path('',					views.index,				name = "Index"),
	path('combo_2',				views.combo_2,				name = "combo_2"),

	path('api/home/statistic/',	views.get_home_statistic,	name = "api-statistic"),
	path('api/home/bigsmall/',	views.get_home_bigsmall,	name = "api-bigsmall"),
	path('api/home/oddseven/',	views.get_home_oddseven,	name = "api-oddseven"),
	path('api/home/tail/',		views.get_home_tail,		name = "api-tail"),

	path('api/combo_2/pop/',	views.get_combo_2_pop,		name = "api-combo_2_pop"),
]