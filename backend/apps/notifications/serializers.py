from rest_framework import serializers
from django.utils import timezone
from .models import Notification
from backend.apps.patients.models import Patient
from backend.apps.appointments.models import Appointment

class NotificationSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    appointment = serializers.PrimaryKeyRelatedField(queryset=Appointment.objects.all(), allow_null=True)

    class Meta:
        model = Notification
        fields = ['id', 'patient', 'appointment', 'notification_type', 'status', 'message', 'scheduled_at', 'sent_at', 'created_at']
        read_only_fields = ['id', 'status', 'sent_at', 'created_at']

    def validate(self, data):
        if data['scheduled_at'] < timezone.now():
            raise serializers.ValidationError("Scheduled time cannot be in the past.")
        return data