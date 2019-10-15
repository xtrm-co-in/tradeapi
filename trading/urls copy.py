from django.urls import path
from django.conf.urls import url,include
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from .views import StockoutwardViewSet,SalesViewSet,MenuitemsViewSet,UserViewSet

router=DefaultRouter()
router.register(r'challans',StockoutwardViewSet,base_name='challan')
router.register(r'sales',SalesViewSet,base_name='sale')
router.register(r'menuitems',MenuitemsViewSet,base_name='menuitem')
router.register(r'users',UserViewSet,base_name='user')
urlpatterns=[
    path('',TemplateView.as_view(template_name='dashboard_v1x.html'),name="home"),
    path('auth/',include('rest_auth.urls')),
    path('login',TemplateView.as_view(template_name='login.html'),name="login"),
    path('lockscreen',TemplateView.as_view(template_name='lockscreen.html'),name="lockscreen"),
    path('resetpassword',TemplateView.as_view(template_name='reset-password.html'),name="resetpassword"),
    path('forgot-password',TemplateView.as_view(template_name='forgot-password.html'),name="forgotpassword"),
]
urlpatterns+=router.urls
# urlpatterns+=[path('auth/',include('rest_auth.urls')),]