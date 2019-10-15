from rest_framework import serializers
from .models import Stockoutward,Sales,Menuitems
class StockoutwardSerializer(serializers.ModelSerializer):
    # author=serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model=Stockoutward
        fields='__all__'

class MenuitemSerializer(serializers.ModelSerializer):
    # author=serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model=Menuitems
        fields='__all__'        

class SalesSerializer(serializers.ModelSerializer):
    author=serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model=Sales
        fields='__all__'        