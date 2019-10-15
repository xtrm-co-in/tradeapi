from django.db import models
from django.conf import settings
from appusers import models as appusers_model
# Create your models here.
class Menuitems(models.Model):
    menuorder=models.IntegerField(primary_key=True)
    menualias=models.CharField(max_length=255)
    menutitle=models.CharField(max_length=255)
    menusubtitle=models.CharField(max_length=255)
    menuapi=models.CharField(max_length=255)
    menuisreport=models.IntegerField()
    # menuHasDateRange=models.IntegerField()
    class Meta:
        managed=False
        db_table='menuitems'
    def __str__(self):
        return self.menusubtitle

class Stockoutward(models.Model):
    vdate=models.DateTimeField()
    vouchertype=models.CharField(max_length=255)
    voucher_no=models.CharField(max_length=255)
    item_name=models.CharField(max_length=255)
    party_ac=models.CharField(max_length=255)
    display_name=models.CharField(max_length=255)
    qty=models.CharField(max_length=255)
    amount=models.CharField(max_length=255)
    rate=models.CharField(max_length=255)
    uniquekey=models.BigIntegerField(primary_key=True)
    class Meta:
        managed=False
        db_table='stock_outward'

class Sales(models.Model):
    vdate=models.DateTimeField()
    ddate=models.CharField(max_length=10)
    particulars=models.CharField(max_length=255)
    vchtype=models.CharField(max_length=255)
    voucher_no=models.CharField(max_length=255)
    recpay=models.CharField(max_length=255)
    orig_vch=models.CharField(max_length=255)
    uniquekey=models.BigIntegerField(primary_key=True)
    credit=models.CharField(max_length=255)
    debit=models.CharField(max_length=255)
    author=models.ForeignKey(appusers_model.User,on_delete=models.CASCADE)
    class Meta:
        managed=False
        db_table='sales'
    def __str__(self):
        return self.uniquekey