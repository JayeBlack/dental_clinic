from django.contrib import admin
from django.urls import path, include
import backend.apps.clinic_auth.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include(backend.apps.clinic_auth.urls))
]
