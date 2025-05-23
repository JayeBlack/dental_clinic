from rest_framework import serializers
from django.utils import timezone
from .models import Appointment
from backend.apps.clinic_auth.models import User
from backend.apps.patients.models import Patient


class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    doctor = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='doctor'))

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'doctor', 'appointment_date', 'status', 'notes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'status']

    def validate(self, data):
        # Ensure appointment_date is a datetime object and compare with current time
        appointment_date = data['appointment_date']
        if appointment_date < timezone.now():
            raise serializers.ValidationError("Appointment date cannot be in the past.")
        return data
