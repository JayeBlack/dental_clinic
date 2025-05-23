from django.urls import path
from . import views

app_name = 'appointments'

urlpatterns = [
    path('create/', views.AppointmentCreateView.as_view(), name='appointment_create'),
    path('list/', views.AppointmentListView.as_view(), name='appointment_list'),
    path('retrieve/<int:pk>/', views.AppointmentRetrieveView.as_view(), name='appointment_retrieve'),
    path('update/<int:pk>/', views.AppointmentUpdateView.as_view(), name='appointment_update'),
    path('cancel/<int:pk>/', views.AppointmentCancelView.as_view(), name='appointment_cancel'),
]