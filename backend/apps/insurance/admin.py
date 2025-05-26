from django.contrib import admin
from .models import InsuranceClaim


@admin.register(InsuranceClaim)
class InsuranceClaimAdmin(admin.ModelAdmin):
    list_display = ['patient', 'appointment', 'amount', 'status', 'submitted_at']
    list_filter = ['status', 'submitted_at']
    search_fields = ['patient__full_name', 'claim_number']
