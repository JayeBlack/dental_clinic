import logging

import sendgrid
from django.conf import settings
from django.utils import timezone
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from sendgrid.helpers.mail import Mail

from backend.apps.appointments.permissions import AppointmentPermission
from .models import Notification
from .serializers import NotificationSerializer

# Set up logging
logger = logging.getLogger(__name__)


class NotificationCreateView(generics.CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [AppointmentPermission]


class NotificationListView(generics.ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [AppointmentPermission]


class NotificationSendView(generics.UpdateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [AppointmentPermission]

    def update(self, request, *args, **kwargs):
        notification = self.get_object()

        # Check if already sent or failed
        if notification.status in ['sent', 'failed']:
            return Response({"detail": "Notification already processed."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if scheduled time has passed
        if notification.scheduled_at > timezone.now():
            return Response({"detail": "Scheduled time not yet reached."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if notification.notification_type == 'email':
                # Send email via SendGrid
                sg = sendgrid.SendGridAPIClient(settings.SENDGRID_API_KEY)
                email = Mail(
                    from_email=settings.FROM_EMAIL,
                    to_emails=notification.patient.email,
                    subject='Smile Clinic Notification',
                    plain_text_content=notification.message
                )
                response = sg.send(email)
                logger.info(f"SendGrid response: {response.status_code} - {response.body}")
                if response.status_code not in [200, 202]:
                    raise Exception(f"Email sending failed: {response.body}")

            elif notification.notification_type == 'sms':
                # Mock SMS sending for testing (due to Twilio free tier limitations)
                logger.info(
                    f"Mock SMS to {notification.patient.phone_number}: {notification.message}"
                )
                # Simulate successful SMS send
                notification.status = 'sent'
                notification.sent_at = timezone.now()

            # Update notification status
            notification.status = 'sent'
            notification.sent_at = timezone.now()

        except Exception as e:
            notification.status = 'failed'
            notification.save()
            return Response({"detail": f"Failed to send notification: {str(e)}"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        notification.save()
        return Response(NotificationSerializer(notification).data, status=status.HTTP_200_OK)
