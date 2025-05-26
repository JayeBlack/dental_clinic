from requests import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import InsuranceClaim
from .serializers import InsuranceClaimSerializer
from backend.apps.appointments.permissions import AppointmentPermission


class InsuranceClaimCreateView(generics.CreateAPIView):
    queryset = InsuranceClaim.objects.all()
    serializer_class = InsuranceClaimSerializer
    permission_classes = [AppointmentPermission]


class InsuranceClaimListView(generics.ListAPIView):
    queryset = InsuranceClaim.objects.all()
    serializer_class = InsuranceClaimSerializer
    permission_classes = [AppointmentPermission]


class InsuranceClaimRetrieveView(generics.RetrieveAPIView):
    queryset = InsuranceClaim.objects.all()
    serializer_class = InsuranceClaimSerializer
    permission_classes = [AppointmentPermission]


class InsuranceClaimUpdateView(generics.UpdateAPIView):
    queryset = InsuranceClaim.objects.all()
    serializer_class = InsuranceClaimSerializer
    permission_classes = [AppointmentPermission]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = request.data.get('status', instance.status)
        instance.processed_at = timezone.now() if instance.status in ['approved', 'rejected'] else None
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
