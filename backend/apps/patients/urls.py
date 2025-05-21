from django.urls import path
from . import views

app_name = 'patients'

urlpatterns = [
    path('create/', views.PatientCreateView.as_view(), name='patient_create'),
    path('list/', views.PatientListView.as_view(), name='patient_list'),
    path('retrieve/<int:pk>/', views.PatientRetrieveView.as_view(), name='patient_retrieve'),
    path('delete/<int:pk>/', views.PatientDeleteView.as_view(), name='patient_delete'),

]