from django.db import models
from django.conf import settings

class Patient(models.Model):
    full_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=15)
    nhis_number = models.BinaryField()  # Store encrypted NHIS number
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def encrypt_nhis_number(self, nhis_number):
        """Encrypt the NHIS number using Fernet."""
        encrypted = settings.FERNET.encrypt(nhis_number.encode())
        self.nhis_number = encrypted
        self.save()

    def decrypt_nhis_number(self):
        """Decrypt the NHIS number using Fernet."""
        decrypted = settings.FERNET.decrypt(self.nhis_number).decode()
        return decrypted

    def __str__(self):
        return self.full_name