from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer
from .permissions import AppointmentPermission


class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AppointmentPermission]


class AppointmentListView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AppointmentPermission]


class AppointmentRetrieveView(generics.RetrieveAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AppointmentPermission]


class AppointmentUpdateView(generics.UpdateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AppointmentPermission]


class AppointmentCancelView(generics.UpdateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AppointmentPermission]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 'cancelled'
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Allow POST as an alternative method for cancellation
    def post(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
