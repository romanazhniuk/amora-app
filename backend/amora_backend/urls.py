from django.contrib import admin
from django.urls import include, path

from api.views import RootView

urlpatterns = [
    path('', RootView.as_view()),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
