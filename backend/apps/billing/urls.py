from django.urls import path
from . import views

app_name = 'billing'

urlpatterns = [
    path('invoices/create/', views.InvoiceCreateView.as_view(), name='invoice_create'),
    path('invoices/list/', views.InvoiceListView.as_view(), name='invoice_list'),
    path('invoices/retrieve/<int:pk>/', views.InvoiceRetrieveView.as_view(), name='invoice_retrieve'),
    path('payments/process/<int:invoice_id>/', views.PaymentProcessView.as_view(), name='payment_process'),
]