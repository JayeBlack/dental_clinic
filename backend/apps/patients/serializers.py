from rest_framework import serializers
from .models import Patient


class PatientSerializer(serializers.ModelSerializer):
    nhis_number = serializers.CharField(write_only=True)  # Encrypted on save

    class Meta:
        model = Patient
        fields = ['id', 'full_name', 'date_of_birth', 'phone_number', 'nhis_number', 'address', 'created_at',
                  'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        patient = Patient(
            full_name=validated_data['full_name'],
            date_of_birth=validated_data['date_of_birth'],
            phone_number=validated_data['phone_number'],
            address=validated_data.get('address', '')
        )
        patient.encrypt_nhis_number(validated_data['nhis_number'])
        patient.save()
        return patient

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['nhis_number'] = instance.decrypt_nhis_number()  # Decrypt for display
        return data
