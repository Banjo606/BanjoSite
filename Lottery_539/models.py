from django.db import models

# Create your models here.
class history(models.Model):
    drawdate = models.DateField()
    num_1 = models.SmallIntegerField()
    num_2 = models.SmallIntegerField()
    num_3 = models.SmallIntegerField()
    num_4 = models.SmallIntegerField()
    num_5 = models.SmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)