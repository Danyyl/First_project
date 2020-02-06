"""Project_Apz URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include,path
from rest_framework import routers
from Server import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('hello/', views.HelloView.as_view(), name='hello'),
    path('user/registration/', views.Register.as_view(), name='Registretion'),
    path('user/profile/', views.ProfileView.as_view(), name='Profile'),
    path('user/plots/', views.PlotView.as_view(), name='Plots'),
    path('user/machine/', views.MachineView.as_view(), name='Machine'),
    path('user/machine_do/', views.MachineDo.as_view(), name='MachineDo'),
    path('user/service/', views.ServiceView.as_view(), name='Service'),
    path('user/service_all/', views.Service_allView.as_view(), name='Service_all'),
    path('user/operation/', views.OperationView.as_view(), name='Operation'),
    path('user/operationDo/', views.OperationDo.as_view(), name='OperationDo'),
]

