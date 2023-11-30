from django.db import models

# Create your models here.
class history(models.Model):
    drawdate = models.DateField(verbose_name = '開獎日期')
    num_1 = models.SmallIntegerField(verbose_name = '號碼１')
    num_2 = models.SmallIntegerField(verbose_name = '號碼２')
    num_3 = models.SmallIntegerField(verbose_name = '號碼３')
    num_4 = models.SmallIntegerField(verbose_name = '號碼４')
    num_5 = models.SmallIntegerField(verbose_name = '號碼５')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "開獎清單"
        verbose_name = "開獎記錄"