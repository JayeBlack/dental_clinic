from rest_framework import serializers
from .models import Invoice, Payment
from backend.apps.patients.models import Patient
from backend.apps.appointments.models import Appointment
from backend.apps.insurance.models import InsuranceClaim


class InvoiceSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    appointment = serializers.PrimaryKeyRelatedField(queryset=Appointment.objects.all())
    insurance_claim = serializers.PrimaryKeyRelatedField(queryset=InsuranceClaim.objects.all(), allow_null=True)

    class Meta:
        model = Invoice
        fields = ['id', 'patient', 'appointment', 'insurance_claim', 'total_amount', 'amount_covered_by_insurance',
                  'amount_due', 'status', 'issued_at', 'due_date']
        read_only_fields = ['id', 'amount_covered_by_insurance', 'amount_due', 'status', 'issued_at']

    def create(self, validated_data):
        # Calculate amount_due based on insurance coverage
        insurance_claim = validated_data.get('insurance_claim')
        total_amount = validated_data['total_amount']
        amount_covered = insurance_claim.amount if insurance_claim and insurance_claim.status == 'approved' else 0
        amount_due = total_amount - amount_covered

        invoice = Invoice(
            patient=validated_data['patient'],
            appointment=validated_data['appointment'],
            insurance_claim=insurance_claim,
            total_amount=total_amount,
            amount_covered_by_insurance=amount_covered,
            amount_due=amount_due,
            due_date=validated_data['due_date'],
        )
        invoice.save()
        return invoice


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'invoice', 'amount', 'payment_method', 'transaction_id', 'payment_status', 'payment_date']
        read_only_fields = ['id', 'transaction_id', 'payment_status', 'payment_date']
