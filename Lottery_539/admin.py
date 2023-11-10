from django.contrib import admin
from . models import history

# Register your models here.
@admin.register(history)
class history_admin(admin.ModelAdmin):
	list_display = ['id', 'drawdate', 'num_1', 'num_2', 'num_3', 'num_4', 'num_5']
