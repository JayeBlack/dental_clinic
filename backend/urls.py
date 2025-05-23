from django.contrib import admin
from django.urls import path, include
import backend.apps.clinic_auth.urls
import backend.apps.patients.urls
import backend.apps.appointments.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include(backend.apps.clinic_auth.urls)),
    path('api/patients/', include(backend.apps.patients.urls)),
    path('api/appointments/', include(backend.apps.appointments.urls))
]
