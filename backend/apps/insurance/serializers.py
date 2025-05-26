from rest_framework import serializers
from django.utils import timezone
from .models import InsuranceClaim
from backend.apps.patients.models import Patient
from backend.apps.appointments.models import Appointment

class InsuranceClaimSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    appointment = serializers.PrimaryKeyRelatedField(queryset=Appointment.objects.all())
    claim_number = serializers.CharField(write_only=True)  # Encrypted on save

    class Meta:
        model = InsuranceClaim
        fields = ['id', 'patient', 'appointment', 'claim_number', 'amount', 'status', 'submitted_at', 'processed_at']
        read_only_fields = ['id', 'submitted_at', 'processed_at']

    def create(self, validated_data):
        claim = InsuranceClaim(
            patient=validated_data['patient'],
            appointment=validated_data['appointment'],
            amount=validated_data['amount']
        )
        claim.encrypt_claim_number(validated_data['claim_number'])
        claim.save()
        return claim

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['claim_number'] = instance.decrypt_claim_number()
        return data