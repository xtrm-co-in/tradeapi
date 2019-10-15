from django.contrib.auth.decorators import login_required
from django.urls import path
from django.conf.urls import url,include
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from .views import UserViewSet

router=DefaultRouter()
router.register(r'users',UserViewSet,base_name='user')
urlpatterns=[
    path('accounts/login/',TemplateView.as_view(template_name='appusers/login.html'),name="login"),
    path('accounts/password-change/',login_required(TemplateView.as_view(template_name='appusers/password-change.html')),name="password-change"),
    path('accounts/password-reset/',TemplateView.as_view(template_name='appusers/password-reset.html'),name="password-reset"),
    # path('accounts/password-reset-confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/',TemplateView.as_view(template_name='appusers/password-reset-confirm.html'),name="password_reset_confirm"),
    url(r'^accounts/confirm-email/(?P<key>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        TemplateView.as_view(template_name="appusers/email-verification.html"),
        name='email-verification'),
    url(r'^accounts/password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        TemplateView.as_view(template_name="appusers/password-reset-confirm.html"),
        name='password_reset_confirm'),
    path('auth/',include('rest_auth.urls')),
    path('auth/registration/',include('rest_auth.registration.urls')),
    path('account/',include('allauth.urls')),
    # path('password-reset/confirm',TemplateView.as_view(template_name='password-reset-confirm.html'),name="password-reset-confirm"),
]
urlpatterns+=router.urls    