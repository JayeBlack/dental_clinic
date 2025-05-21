from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'full_name', 'role', 'is_active', 'is_staff']
        read_only_fields = ['id', 'is_active', 'is_staff']


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['phone_number', 'full_name', 'role', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            phone_number=validated_data['phone_number'],
            full_name=validated_data['full_name'],
            role=validated_data['role'],
            password=validated_data['password']
        )
        return user


class LoginSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['phone_number'] = serializers.CharField()

    def validate(self, attrs):
        authenticate_kwargs = {
            'username': attrs['phone_number'],
            'password': attrs['password'],
        }
        user = authenticate(**authenticate_kwargs)

        if not user:
            raise serializers.ValidationError('Invalid phone number or password')

        attrs['user'] = user
        return super().validate(attrs)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'full_name', 'role', 'is_active', 'is_staff']
        read_only_fields = ['id', 'phone_number', 'full_name', 'role', 'is_active', 'is_staff']
