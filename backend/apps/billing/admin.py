from django.contrib import admin
from .models import Invoice, Payment


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient', 'total_amount', 'amount_due', 'status', 'issued_at']
    list_filter = ['status', 'issued_at']
    search_fields = ['patient__full_name']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['invoice', 'amount', 'payment_method', 'payment_status', 'payment_date']
    list_filter = ['payment_method', 'payment_status', 'payment_date']
    search_fields = ['invoice__id']
