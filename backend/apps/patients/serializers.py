from rest_framework import serializers
from .models import Patient
from backend.apps.clinic_auth.models import User


class PatientSerializer(serializers.ModelSerializer):
    nhis_number = serializers.CharField(write_only=True)  # Encrypted on save

    class Meta:
        model = Patient
        fields = [
            'id', 'full_name', 'date_of_birth', 'phone_number', 'email', 'nhis_number', 'address',
            'gender', 'emergency_contact', 'created_at', 'updated_at'
        ]
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


class PatientSignupSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    username = serializers.CharField(max_length=150, required=False, allow_blank=True)
    full_name = serializers.CharField(max_length=100)
    password = serializers.CharField(write_only=True, min_length=8)
    date_of_birth = serializers.DateField()
    nhis_number = serializers.CharField(write_only=True)
    address = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)

    def validate(self, attrs):
        if User.objects.filter(phone_number=attrs['phone_number']).exists():
            raise serializers.ValidationError({'phone_number': 'A user with this phone number already exists.'})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            phone_number=validated_data['phone_number'],
            username=validated_data.get('username'),
            full_name=validated_data['full_name'],
            role='patient',
            password=validated_data['password']
        )
        patient = Patient.objects.create(
            user=user,
            full_name=validated_data['full_name'],
            date_of_birth=validated_data['date_of_birth'],
            phone_number=validated_data['phone_number'],
            address=validated_data.get('address', ''),
            email=validated_data.get('email', '')
        )
        patient.encrypt_nhis_number(validated_data['nhis_number'])
        return user
