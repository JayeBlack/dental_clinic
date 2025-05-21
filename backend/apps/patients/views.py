from rest_framework import generics
from .models import Patient
from .serializers import PatientSerializer
from .permissions import PatientPermission


class PatientCreateView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [PatientPermission]


class PatientListView(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [PatientPermission]


class PatientRetrieveView(generics.RetrieveAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [PatientPermission]

class PatientDeleteView(generics.DestroyAPIView):
    queryset = Patient.objects.all()
    permission_classes = [PatientPermission]