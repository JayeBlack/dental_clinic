from django.urls import path
from . import views

app_name = 'insurance'

urlpatterns = [
    path('create/', views.InsuranceClaimCreateView.as_view(), name='claim_create'),
    path('list/', views.InsuranceClaimListView.as_view(), name='claim_list'),
    path('retrieve/<int:pk>/', views.InsuranceClaimRetrieveView.as_view(), name='claim_retrieve'),
    path('update/<int:pk>/', views.InsuranceClaimUpdateView.as_view(), name='claim_update'),
]