from django.contrib.auth.decorators import login_required
from django.urls import path
from django.conf.urls import url,include
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from .views import StockoutwardViewSet,SalesView,MenuitemsViewSet

router=DefaultRouter()
# router.register(r'challans',StockoutwardViewSet,base_name='challan')
router.register(r'menuitems',MenuitemsViewSet,base_name='menuitem')

urlpatterns=[
    path('',login_required(TemplateView.as_view(template_name='trading/index.html')),name="home"),
    path('sales/',login_required(SalesView.as_view()),name='sale'),
]
urlpatterns+=router.urls