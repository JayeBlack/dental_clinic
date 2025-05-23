from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView  # Correct import


class AppointmentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        # Allow admin full access
        if request.user.role == 'admin':
            return True

        # Determine the action based on the view's method
        action = None
        if request.method == 'POST':
            action = 'create'
        elif request.method == 'GET':
            if isinstance(view, RetrieveAPIView):
                action = 'retrieve'
            else:
                action = 'list'
        elif request.method == 'PUT':
            if 'cancel' in request.path:
                action = 'cancel'
            else:
                action = 'update'

        # Create: Only admin and receptionist
        if action == 'create':
            return request.user.role in ['admin', 'receptionist']

        # List: Allow admin, doctor, nurse, receptionist
        if action == 'list':
            return request.user.role in ['admin', 'doctor', 'nurse', 'receptionist']

        # Retrieve: Allow admin, doctor, nurse
        if action == 'retrieve':
            return request.user.role in ['admin', 'doctor', 'nurse']

        # Update/Cancel: Only admin and doctor
        if action in ['update', 'cancel']:
            return request.user.role in ['admin', 'doctor']

        return False
