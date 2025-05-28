from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class PhoneOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Try to authenticate with phone_number first
            user = UserModel.objects.get(phone_number=username)
            if user.check_password(password):
                return user
        except UserModel.DoesNotExist:
            # If phone_number fails, try username
            try:
                user = UserModel.objects.get(username=username)
                if user.check_password(password):
                    return user
            except UserModel.DoesNotExist:
                return None

    def get_user(self, user_id):
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None