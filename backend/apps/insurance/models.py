from django.db import models
from django.conf import settings
from backend.apps.patients.models import Patient
from backend.apps.appointments.models import Appointment


class InsuranceClaim(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    claim_number = models.BinaryField()  # Encrypted claim number
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)

    def encrypt_claim_number(self, claim_number):
        """Encrypt the claim number using Fernet."""
        encrypted = settings.FERNET.encrypt(claim_number.encode())
        self.claim_number = encrypted
        self.save()

    def decrypt_claim_number(self):
        """Decrypt the claim number using Fernet."""
        if not isinstance(self.claim_number, bytes):
            claim_bytes = bytes(self.claim_number)
        else:
            claim_bytes = self.claim_number
        decrypted = settings.FERNET.decrypt(claim_bytes).decode()
        return decrypted

    def __str__(self):
        return f"Claim for {self.patient} - {self.status}"
