from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, phone_number, full_name, role, password=None, **extra_fields):
        """
        Create and save a regular user with the given phone number, full name, and role.
        """
        if not phone_number:
            raise ValueError("The Phone Number must be set")
        if not full_name:
            raise ValueError("The Full Name must be set")

        # Normalize phone number (if needed) or format it
        extra_fields.setdefault('is_staff', False)
        user = self.model(
            phone_number=phone_number,
            full_name=full_name,
            role=role,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, full_name, role, password=None, **extra_fields):
        """
        Create and save a superuser with the given phone number, full name, and role.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(phone_number, full_name, role, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('receptionist', 'Receptionist'),
    ]

    phone_number = models.CharField(max_length=15, unique=True)
    full_name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['full_name', 'role']

    # Customize related_name for groups and user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='clinic_users',  # Unique related_name
        blank=True,
        help_text='The groups this user belongs to.',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='clinic_user_permissions',  # Unique related_name
        blank=True,
        help_text='Specific permissions for this user.',
    )

    def __str__(self):
        return self.full_name


class AuditLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.action}"
